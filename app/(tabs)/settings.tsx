import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function SettingsScreen({ navigation }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const handleLogin = () => navigation.navigate('Auth', { screen: 'Login' });
  const handleCreateAccount = () => navigation.navigate('Auth', { screen: 'Signup' });

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const toggleFeedback = () => setShowFeedback(!showFeedback);

  const submitFeedback = () => {
    if (feedbackText.trim()) {
      Alert.alert('Feedback Submitted', 'Thank you for your feedback!', [
        {
          text: 'OK',
          onPress: () => {
            setFeedbackText('');
            setShowFeedback(false);
          }
        }
      ]);
    }
  };

  const handleRateApp = () => {
    Alert.alert('Rate App', 'Would you like to rate our app in the store?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Rate Now', onPress: () => {} }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        {!isLoggedIn ? (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginTitle}>Make the move to privacy.</Text>
            <Text style={styles.loginText}>
              Get secure access to all features when you create an account.
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccount}>
              <Text style={styles.primaryButtonText}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleLogin}>
              <Text style={styles.secondaryButtonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Theme</Text>
          <View style={styles.themeToggle}>
            <TouchableOpacity
              onPress={() => setIsDarkTheme(false)}
              style={[styles.themeOption, !isDarkTheme && styles.selectedOption]}>
              <Text style={[styles.themeText, !isDarkTheme && styles.selectedText]}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsDarkTheme(true)}
              style={[styles.themeOption, isDarkTheme && styles.selectedOption]}>
              <Text style={[styles.themeText, isDarkTheme && styles.selectedText]}>Dark</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.label}>Notifications</Text>
          <View style={styles.onOffToggle}>
            <Text style={[styles.onOffLabel, notificationsEnabled && styles.onSelected]}>On</Text>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={toggleNotifications}
              trackColor={{ false: '#767577', true: '#3478f6' }}
              thumbColor={notificationsEnabled ? '#f5f5f5' : '#f4f3f4'}
            />
            <Text style={[styles.onOffLabel, !notificationsEnabled && styles.offSelected]}>
              Off
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.supportOption} onPress={toggleFeedback}>
          <Text style={styles.supportOptionText}>Send Feedback</Text>
        </TouchableOpacity>

        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <TextInput
              style={styles.feedbackInput}
              multiline
              numberOfLines={4}
              placeholder="Type your feedback here..."
              placeholderTextColor="#aaa"
              value={feedbackText}
              onChangeText={setFeedbackText}
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitFeedback}>
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.supportOption} onPress={() => setIsHelpVisible(true)}>
          <Text style={styles.supportOptionText}>Get Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportOption} onPress={handleRateApp}>
          <Text style={styles.supportOptionText}>Rate the App</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isHelpVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.helpContainer}>
              <Text style={styles.helpTitle}>Help Documentation</Text>
              <View style={styles.helpSection}>
                <Text style={styles.helpSectionTitle}>Getting Started</Text>
                <Text style={styles.helpText}>
                  1. Create an account or sign in{"\n"}
                  2. Explore the main features{"\n"}
                  3. Customize your settings
                </Text>
              </View>
              <View style={styles.helpSection}>
                <Text style={styles.helpSectionTitle}>Account Management</Text>
                <Text style={styles.helpText}>
                  - Change your password in Account Settings{"\n"}
                  - Enable 2FA for security{"\n"}
                  - Contact support if locked out
                </Text>
              </View>
              <View style={styles.helpSection}>
                <Text style={styles.helpSectionTitle}>Troubleshooting</Text>
                <Text style={styles.helpText}>
                  - Restart device for crashes{"\n"}
                  - Check app permissions for notifications{"\n"}
                  - Ensure internet for syncing
                </Text>
              </View>
              <View style={styles.contactSection}>
                <Text style={styles.contactTitle}>Still need help?</Text>
                <Text style={styles.contactText}>Contact support@yourapp.com</Text>
              </View>
              <TouchableOpacity onPress={() => setIsHelpVisible(false)} style={styles.closeModal}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f5",
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#000",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: "#000",
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: "#000",
    fontSize: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    overflow: 'hidden',
  },
  themeOption: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  selectedOption: {
    backgroundColor: "#3478f6",
  },
  themeText: {
    color: "#666",
    fontWeight: '600',
  },
  selectedText: {
    color: "#fff",
  },
  onOffToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onOffLabel: {
    color: "#666",
    marginHorizontal: 8,
    fontWeight: '600',
  },
  onSelected: {
    color: "#3478f6",
  },
  offSelected: {
    color: "#666",
  },
  supportOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  supportOptionText: {
    color: "#000",
    fontSize: 16,
  },
  feedbackContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  feedbackInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    color: "#000",
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: "#3478f6",
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: '700',
    fontSize: 16,
  },
  loginPrompt: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 8,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: "#3478f6",
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#3478f6",
  },
  secondaryButtonText: {
    color: "#3478f6",
    fontWeight: '600',
    fontSize: 16,
  },
  helpContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  helpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 20,
  },
  helpSection: {
    marginBottom: 25,
  },
  helpSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: "#000",
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  contactSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: "#000",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: '90%',
  },
  closeModal: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3478f6",
    borderRadius: 8,
  },
  closeModalText: {
    color: "#fff",
    fontWeight: '600',
  },
});