import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const DeviceScanner = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

  const [activity, setActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const [downloadSpeeds, setDownloadSpeeds] = useState([]);

  const scanNetwork = async () => {
    setScanning(true);
    try {
      const response = await fetch('http://192.168.1.195:5000/api/devices');
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      console.error('Scan failed', error);
    }
    setScanning(false);
  };

  const fetchActivity = async () => {
    setLoadingActivity(true);
    try {
      const response = await fetch('http://192.168.1.195:5000/api/ping');
      const data = await response.json();
      setActivity(data);
      if (data.download_speed !== undefined) {
        setDownloadSpeeds((prev) => [...prev, data.download_speed]);
      }
    } catch (error) {
      console.error('Failed to fetch activity', error);
    }
    setLoadingActivity(false);
  };

  const getAverageDownloadSpeed = () => {
    if (downloadSpeeds.length === 0) return 0;
    const total = downloadSpeeds.reduce((sum, speed) => sum + speed, 0);
    return (total / downloadSpeeds.length).toFixed(2);
  };

  const StatusDot = ({ connected }) => (
    <View
      style={[
        styles.statusDot,
        { backgroundColor: connected ? '#4CAF50' : '#F44336' },
      ]}
    />
  );

  const renderDevice = ({ item }) => (
    <View style={styles.deviceContainer}>
      <StatusDot connected={item.connected} />
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceIp}>{item.ip}</Text>
        <Text style={styles.deviceMac}>MAC: {item.mac}</Text>
        <Text style={styles.deviceVendor}>
          Vendor: {item.vendor || 'Unknown'}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.container}>
          <Text style={styles.title}>Devices on the Network</Text>

          <Button title="Scan Network" onPress={scanNetwork} color="#1E90FF" />

          {scanning && (
            <ActivityIndicator size="large" color="#1E90FF" style={styles.spinner} />
          )}

          {!scanning && devices.length === 0 && (
            <Text style={styles.noDevicesText}>
              No devices found yet. Tap "Scan Network" to start.
            </Text>
          )}

          <View style={styles.devicesBox}>
            <Text style={styles.activityTitle}>Device List</Text>
          </View>
        </View>
      }
      data={devices}
      keyExtractor={(item) => item.mac || item.ip}
      renderItem={renderDevice}
      ListFooterComponent={
        <View style={styles.footerContainer}>
          <View style={styles.activityBox}>
            <Text style={styles.activityTitle}>Activity</Text>
            <Button
              title="Check Network Activity"
              onPress={fetchActivity}
              color="#1E90FF"
            />
            {loadingActivity && (
              <ActivityIndicator size="large" color="#1E90FF" style={styles.spinner} />
            )}
            {activity && !loadingActivity && (
              <>
                <View style={styles.grid}>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Latency</Text>
                    <Text style={styles.cardValue}>{activity.latency} ms</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Packet Loss</Text>
                    <Text style={styles.cardValue}>{activity.packet_loss} %</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Download Speed</Text>
                    <Text style={styles.cardValue}>
                      {activity.download_speed} Mbps
                    </Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Upload Speed</Text>
                    <Text style={styles.cardValue}>
                      {activity.upload_speed} Mbps
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>

          {/* Final Big Box for Average Download Speed */}
          <View style={styles.hugeAverageBox}>
            <Text style={styles.hugeAverageTitle}>Average Download Speed</Text>
            <Text style={styles.hugeAverageValue}>
              {getAverageDownloadSpeed()} Mbps
            </Text>
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafd',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  spinner: {
    marginVertical: 20,
  },
  noDevicesText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  devicesBox: {
    marginVertical: 10,
  },
  deviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  statusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 15,
  },
  deviceInfo: {
    flexDirection: 'column',
  },
  deviceIp: {
    fontSize: 16,
    color: '#1E90FF',
    fontWeight: '600',
  },
  deviceMac: {
    fontSize: 14,
    color: '#444',
  },
  deviceVendor: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  activityBox: {
    paddingBottom: 20,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 18,
    color: '#1E90FF',
    fontWeight: '700',
  },
  hugeAverageBox: {
    marginTop: 25,
    padding: 25,
    borderRadius: 16,
    backgroundColor: '#ccefff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  hugeAverageTitle: {
    fontSize: 15,
    color: '#005a8d',
    fontWeight: '700',
    marginBottom: 10,
  },
  hugeAverageValue: {
    fontSize: 25,
    color: '#007acc',
    fontWeight: '900',
  },
});

export default DeviceScanner;
