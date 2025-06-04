import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const activityLog = [
  {
    time: '2025-05-14 10:15 AM',
    description: 'Logged in from Nairobi, Kenya',
    type: 'normal',
  },
  {
    time: '2025-05-14 10:17 AM',
    description: 'Accessed Personal Files section',
    type: 'normal',
  },
  {
    time: '2025-05-14 10:20 AM',
    description: 'Downloaded 25MB of encrypted data',
    type: 'suspicious',
  },

];

const safeApps = [
  { name: 'Tethering', safe: true },
  { name: 'mCrypto', safe: true },
  { name: 'Lamar - Idle Vlogger', safe: true },
  { name: 'Mini Militia', safe: false, riskType: 'Riskware detected' },
];

export default function SecurityDashboardScreen() {
  const [showProfile, setShowProfile] = useState(false);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'Riskware found',
      app: 'Mini Militia',
      status: 'needs attention',
      resolved: false
    }
  ]);

  const totalApps = 518;
  const safeAppCount = 517;
  const unsafeApps = safeApps.filter(app => !app.safe);

  const handleFixNow = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? {...alert, resolved: true} : alert
    ));
    Alert.alert('Action Taken', 'The security issue has been addressed.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Banner with Profile */}
      <ThemedView style={styles.topBanner}>
        <View style={styles.headerRow}>
          <ThemedText type="title" style={styles.appTitle}>
            🛡️ CyberShield
          </ThemedText>
          <TouchableOpacity onPress={() => setShowProfile(true)}>
            <Image 
              source={require('@/assets/images/profile.png')}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>
        <ThemedText style={styles.welcomeText}>
          Welcome back, Brian!
        </ThemedText>
        <ThemedText style={styles.tagline}>
          Guarding your digital life
        </ThemedText>
      </ThemedView>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showProfile}
        onRequestClose={() => setShowProfile(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image 
              source={require('@/assets/images/profile-large.png')}
              style={styles.profileImage}
            />
            <ThemedText type="title" style={styles.userName}>
              Brian Johnson
            </ThemedText>
            <ThemedText style={styles.userEmail}>
              brian.johnson@example.com
            </ThemedText>
            
            <View style={styles.planCard}>
              <ThemedText type="defaultSemiBold">PRO PLAN</ThemedText>
              <ThemedText style={styles.planDetails}>
                • Unlimited scans{"\n"}
                • Advanced protection{"\n"}
                • Priority support
              </ThemedText>
            </View>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                setShowProfile(false);
                // Navigate to settings
              }}
            >
              <ThemedText>Account Settings</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                setShowProfile(false);
                // Handle logout
              }}
            >
              <ThemedText>Log Out</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowProfile(false)}
            >
              <ThemedText style={styles.closeButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Security Alerts */}
      <ThemedView style={styles.alertsContainer}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Security Alerts
        </ThemedText>
        
        {alerts.filter(a => !a.resolved).map(alert => (
          <ThemedView key={alert.id} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <ThemedText type="defaultSemiBold" style={styles.alertTitle}>
                {alert.title}
              </ThemedText>
              <View style={styles.alertBadge}>
                <ThemedText style={styles.alertBadgeText}>
                  {alert.status.toUpperCase()}
                </ThemedText>
              </View>
            </View>
            
            <ThemedText style={styles.alertAppText}>
              {alert.app} needs your attention
            </ThemedText>
            
            <TouchableOpacity 
              style={styles.fixButton}
              onPress={() => handleFixNow(alert.id)}
            >
              <ThemedText style={styles.fixButtonText}>FIX NOW</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ThemedView>

      {/* App Safety Status */}
      <ThemedView style={styles.safetyContainer}>
        <View style={styles.safetyHeader}>
          <ThemedText type="title" style={styles.sectionTitle}>
            App Safety Status
          </ThemedText>
          <ThemedText style={styles.updatedText}>
            Updated 2 days ago
          </ThemedText>
        </View>
        
        <View style={styles.safetySummary}>
          <ThemedText style={styles.safetyCount}>
            {safeAppCount} of {totalApps} apps are safe
          </ThemedText>
        </View>
        
        {unsafeApps.length > 0 && (
          <ThemedView style={styles.unsafeAppsContainer}>
            {unsafeApps.map((app, index) => (
              <View key={index} style={styles.unsafeApp}>
                <ThemedText type="defaultSemiBold" style={styles.unsafeAppName}>
                  {app.name}
                </ThemedText>
                <ThemedText style={styles.riskType}>
                  {app.riskType}
                </ThemedText>
                <TouchableOpacity style={styles.learnMoreButton}>
                  <ThemedText style={styles.learnMoreText}>
                    Learn more about riskware
                  </ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </ThemedView>
        )}
        
        <View style={styles.safeAppsContainer}>
          <ThemedText style={styles.safeAppsText}>
            {safeAppCount - unsafeApps.length} other apps are safe
          </ThemedText>
        </View>
        
        <ThemedText style={styles.updatedTextBottom}>
          Updated 2 days ago
        </ThemedText>
      </ThemedView>

      {/* Feature Tiles */}
      <ThemedView style={styles.featuresGrid}>
        <FeatureTile title="Phishing alerts" subtitle="Not activated" icon="🛡️" />
        <FeatureTile title="Local Network" subtitle="Wifi Check" icon="📶" />
        <FeatureTile title="Clean Junk" subtitle="Device Junk" icon="🧹" />
        <FeatureTile title="Automatic Scan" subtitle="Not activated" icon="🔒" locked />
      </ThemedView>

      {/* Logs Section */}
      <ThemedView style={styles.logsContainer}>
        <ThemedText type="title" style={styles.logsTitle}>
          User Activity Log
        </ThemedText>
        {activityLog.map((entry, index) => (
          <ThemedView
            key={index}
            style={[
              styles.activityItem,
              entry.type === 'suspicious'
                ? styles.suspicious
                : entry.type === 'warning'
                ? styles.warning
                : styles.normal,
            ]}>
            <ThemedText type="defaultSemiBold">{entry.time}</ThemedText>
            <ThemedText>{entry.description}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

function FeatureTile({ title, subtitle, icon, locked = false }) {
  const [showPopup, setShowPopup] = useState(false);

  const getFeatureDetails = () => {
    switch(title) {
      case 'Phishing alerts':
        return {
          description: 'Protects against fake websites and emails trying to steal your information',
          status: 'Inactive',
          action: 'Activate Protection',
          stats: 'Blocked 0 attempts this month',
          iconColor: '#4ade80'
        };
      case 'Local Network':
        return {
          description: 'Scans devices on your WiFi network for vulnerabilities',
          status: 'Last scan: 2 days ago',
          action: 'Scan Now',
          stats: '3 devices detected',
          iconColor: '#60a5fa'
        };
      case 'Clean Junk':
        return {
          description: 'Frees up storage by removing unnecessary files',
          status: '1.2GB can be cleaned',
          action: 'Clean Now',
          stats: 'Last cleaned: 1 week ago',
          iconColor: '#f472b6'
        };
      case 'Automatic Scan':
        return {
          description: 'Regularly checks your device for threats automatically',
          status: 'Disabled',
          action: 'Enable Automatic Scans',
          stats: 'Next scheduled scan: N/A',
          iconColor: '#f59e0b'
        };
      default:
        return {
          description: '',
          status: '',
          action: '',
          stats: '',
          iconColor: '#94a3b8'
        };
    }
  };

  const details = getFeatureDetails();

  return (
    <>
      <TouchableOpacity 
        style={styles.tile}
        onPress={() => setShowPopup(true)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: details.iconColor + '20' }]}>
          <ThemedText style={[styles.emoji, { color: details.iconColor }]}>{icon}</ThemedText>
        </View>
        <View style={styles.tileTextContainer}>
          <ThemedText type="defaultSemiBold" style={styles.tileTitle}>{title}</ThemedText>
          {subtitle ? <ThemedText style={styles.subtitleText}>{subtitle}</ThemedText> : null}
        </View>
        {locked && <ThemedText style={styles.lockBadge}>🔒</ThemedText>}
      </TouchableOpacity>

      {/* Feature Popup Modal */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <View style={styles.popupHeader}>
              <View style={[styles.popupIconContainer, { backgroundColor: details.iconColor + '20' }]}>
                <ThemedText style={[styles.popupIcon, { color: details.iconColor }]}>{icon}</ThemedText>
              </View>
              <ThemedText type="title" style={styles.popupTitle}>{title}</ThemedText>
              <TouchableOpacity 
                style={styles.closePopupButton}
                onPress={() => setShowPopup(false)}
              >
                <ThemedText style={styles.closePopupText}>✕</ThemedText>
              </TouchableOpacity>
            </View>
            
            <ThemedText style={styles.popupDescription}>{details.description}</ThemedText>
            
            <View style={styles.popupDetailRow}>
              <ThemedText style={styles.popupDetailLabel}>Status:</ThemedText>
              <ThemedText style={styles.popupDetailValue}>{details.status}</ThemedText>
            </View>
            
            <View style={styles.popupDetailRow}>
              <ThemedText style={styles.popupDetailLabel}>Stats:</ThemedText>
              <ThemedText style={styles.popupDetailValue}>{details.stats}</ThemedText>
            </View>

            {!locked && (
              <TouchableOpacity 
                style={[styles.popupActionButton, { backgroundColor: details.iconColor }]}
                onPress={() => {
                  Alert.alert(`${title} Activated`, `The ${title} feature has been enabled`);
                  setShowPopup(false);
                }}
              >
                <ThemedText style={styles.popupActionText}>{details.action}</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  topBanner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#f1f5f9',
    padding: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4ade80',
  },
  welcomeText: {
    fontSize: 18,
    color: '#f8fafc',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#94a3b8',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    marginBottom: 5,
    color: '#f8fafc',
  },
  userEmail: {
    color: '#94a3b8',
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: '#334155',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  planDetails: {
    color: '#cbd5e1',
    marginTop: 10,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
  },
  closeButtonText: {
    color: '#4ade80',
    fontWeight: 'bold',
  },
  alertsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#f1f5f9',
  },
  alertCard: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    color: '#f1f5f9',
    fontSize: 16,
  },
  alertBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertAppText: {
    color: '#94a3b8',
    marginBottom: 16,
  },
  fixButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  fixButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  safetyContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 0,
  },
  safetyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  updatedText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  safetySummary: {
    marginBottom: 15,
  },
  safetyCount: {
    fontSize: 16,
    color: '#f8fafc',
  },
  unsafeAppsContainer: {
    marginVertical: 10,
  },
  unsafeApp: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  unsafeAppName: {
    color: '#f87171',
    marginBottom: 5,
  },
  riskType: {
    color: '#94a3b8',
    marginBottom: 10,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    color: '#4ade80',
    textDecorationLine: 'underline',
  },
  safeAppsContainer: {
    marginTop: 10,
  },
  safeAppsText: {
    color: '#94a3b8',
  },
  updatedTextBottom: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'right',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tile: {
    backgroundColor: '#1e293b',
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 20,
  },
  tileTextContainer: {
    alignItems: 'center',
  },
  tileTitle: {
    color: '#f8fafc',
    textAlign: 'center',
  },
  subtitleText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  lockBadge: {
    fontSize: 14,
    color: '#facc15',
    marginTop: 8,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
  },
  popupContent: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
  },
  popupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  popupIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  popupIcon: {
    fontSize: 24,
  },
  popupTitle: {
    flex: 1,
    fontSize: 20,
    color: '#f8fafc',
  },
  closePopupButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closePopupText: {
    color: '#f8fafc',
    fontSize: 18,
  },
  popupDescription: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  popupDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  popupDetailLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  popupDetailValue: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '600',
  },
  popupActionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  popupActionText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logsContainer: {
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  logsTitle: {
    marginBottom: 16,
    fontSize: 20,
    color: '#f1f5f9',
  },
  activityItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  normal: {
    backgroundColor: '#334155',
  },
  suspicious: {
    backgroundColor: '#f87171',
  },
  warning: {
    backgroundColor: '#facc15',
  },
});