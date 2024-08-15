const express = require('express');
const { MongoClient } = require('mongodb');
const haversine = require('haversine-distance');
const path = require('path');

const app = express();
const port = 3006;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Example coordinates
const supplierCoordinates = { latitude: 45.6139, longitude: 43.2090 }; // Example coordinates
const retailerCoordinates = { latitude: 25.0827, longitude: 43.2707 }; // Example coordinates

const currentWeight = 1200;
// const shelfLife = 400;
// const AvgSpeed = 40;

app.use(express.json());
app.use(express.static(path.join('public')));

// Update driver's location
app.post('/update-location', async (req, res) => {
  const { driverId, latitude, longitude } = req.body;

  if (!driverId || !latitude || !longitude) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  try {
    await client.connect();
    const database = client.db('drivers');
    const collection = database.collection('drivers');

    // Update the driver's location
    const result = await collection.updateOne(
      { _id: driverId },
      { $set: { location: { latitude, longitude } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Driver not found or location not updated' });
    }

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error('Error updating location in MongoDB:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

// Endpoint to find the nearest driver based on distance
app.get('/min-distance-driver', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('drivers');
    const collection = database.collection('drivers');
    const drivers = await collection.find({}).toArray();

    function calculateDistance(coord1, coord2) {
      return haversine(coord1, coord2);
    }

    let optimalDriver = null;
    let minScore = Infinity;
    let min_Distance = Infinity;
    let min_Distance2 = Infinity;
    let closestDriver = null;

    drivers.forEach(driver => {
      const driverCoordinates = driver.location;
      const distanceDriverToSupplier = calculateDistance(driverCoordinates, supplierCoordinates);
      const distanceSupplierToRetailer = calculateDistance(supplierCoordinates, retailerCoordinates);
      min_Distance = distanceSupplierToRetailer;
      const totalDistance = distanceDriverToSupplier + distanceSupplierToRetailer;
      const weightDifference = driver.maxWeight - currentWeight;

      if (min_Distance2 <= totalDistance) {
        closestDriver = driver;
        min_Distance2 = totalDistance;
      }

      if (weightDifference <= 500) {
        const score = 4 * totalDistance + 3 * driver.environmentScore;

        if (score < minScore) {
          minScore = score;
          optimalDriver = driver;
        }
      }
    });

    if (!optimalDriver) {
      optimalDriver = closestDriver;
      minScore = 4 * (calculateDistance(optimalDriver.location, supplierCoordinates) +
        calculateDistance(supplierCoordinates, retailerCoordinates)) +
        3 * optimalDriver.environmentScore;
    }

    if (optimalDriver) {
      res.json({
        driver: optimalDriver,
        score: minScore
      });
    } else {
      res.status(404).send('No suitable drivers found');
    }

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

// Endpoint to get driver coordinates
app.get('/driver-coordinates', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('drivers');
    const collection = database.collection('drivers');
    const drivers = await collection.find({}).toArray();

    function calculateDistance(coord1, coord2) {
      return haversine(coord1, coord2);
    }

    let optimalDriver = null;
    let minScore = Infinity;

    drivers.forEach(driver => {
      const driverCoordinates = driver.location;
      const distanceDriverToSupplier = calculateDistance(driverCoordinates, supplierCoordinates);
      const distanceSupplierToRetailer = calculateDistance(supplierCoordinates, retailerCoordinates);
      const totalDistance = distanceDriverToSupplier + distanceSupplierToRetailer;

      const weightDifference = driver.maxWeight - currentWeight;

      if (weightDifference <= 500) {
        const score = 4 * totalDistance + 3 * driver.environmentScore;

        if (score < minScore) {
          minScore = score;
          optimalDriver = driver;
        }
      }
    });

    if (!optimalDriver) {
      optimalDriver = closestDriver;
      minScore = 4 * (calculateDistance(optimalDriver.location, supplierCoordinates) +
        calculateDistance(supplierCoordinates, retailerCoordinates)) +
        3 * optimalDriver.environmentScore;
    }

    if (optimalDriver) {
      res.json({
        latitude: optimalDriver.location.latitude,
        longitude: optimalDriver.location.longitude
      });
    } else {
      res.status(404).send('No suitable drivers found');
    }

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
