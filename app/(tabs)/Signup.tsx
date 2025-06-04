import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

type OtpArray = [string, string, string, string, string];

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [otp, setOtp] = useState<OtpArray>(["", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const passwordStrength = calculatePasswordStrength(password);

  const getPasswordStrengthColor = (strength: number): string => {
    const colors = ["#ff3e36", "#ff691f", "#ffda36", "#8bc34a", "#4caf50"];
    return colors[strength];
  };

  const getPasswordStrengthText = (strength: number): string => {
    const texts = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    return texts[strength];
  };

  const handleOtpChange = (value: string, index: number): void => {
    const newOtp = [...otp] as OtpArray;
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (): void => {
    if (isLogin) {
      console.log("Logging in with: ", email, password);
    } else {
      if (password !== confirmPass) {
        alert("Passwords don't match!");
        return;
      }
      console.log("Signing up with: ", email, password, confirmPass);
    }
  };

  const handleVerifyCode = (): void => {
    console.log("Verifying OTP: ", otp.join(""));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.headerTabs}>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text style={[styles.tabText, isLogin && styles.activeTab]}>
                Log in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={[styles.tabText, !isLogin && styles.activeTab]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              autoCorrect={false}
              textContentType="emailAddress"
              importantForAutofill="yes"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
              />
              <TouchableOpacity
                onPress={() => setHidePassword(!hidePassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={hidePassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#aaa"
                />
              </TouchableOpacity>
            </View>

            {!isLogin && password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthMeter}>
                  {[1, 2, 3, 4].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthBar,
                        {
                          backgroundColor:
                            i <= passwordStrength
                              ? getPasswordStrengthColor(passwordStrength)
                              : "#eee",
                        },
                      ]}
                    />
                  ))}
                </View>
                <Text
                  style={[
                    styles.strengthText,
                    { color: getPasswordStrengthColor(passwordStrength) },
                  ]}
                >
                  {getPasswordStrengthText(passwordStrength)}
                </Text>
              </View>
            )}

            {!isLogin && (
              <>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Confirm your password"
                    placeholderTextColor="#aaa"
                    secureTextEntry={hideConfirmPassword}
                    value={confirmPass}
                    onChangeText={setConfirmPass}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="password"
                  />
                  <TouchableOpacity
                    onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={hideConfirmPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#aaa"
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {isLogin && (
              <TouchableOpacity
                style={styles.forgotPasswordWrapper}
                onPress={() => setShowCodeModal(true)}
              >
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
              <Text style={styles.continueText}>
                {isLogin ? "Continue" : "Create Account"}
              </Text>
            </TouchableOpacity>

            <View style={styles.orDivider}>
              <View style={styles.line} />
              <Text style={styles.orText}>Or</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="apple1" size={20} />
              <Text style={styles.socialText}>
                {isLogin ? "Login" : "Sign up"} with Apple
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={20} color="#EA4335" />
              <Text style={styles.socialText}>
                {isLogin ? "Login" : "Sign up"} with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.signupPrompt}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Text style={styles.signupLink}>{isLogin ? "Sign up" : "Log in"}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={showCodeModal} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{ alignSelf: "flex-start" }}
                onPress={() => setShowCodeModal(false)}
              >
                <Ionicons name="arrow-back" size={24} />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Check your email</Text>
              <Text style={styles.modalSubtext}>
                We sent a reset link to{" "}
                <Text style={{ fontWeight: "bold" }}>{email || "your email"}</Text>.
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={digit}
                    onChangeText={(val) => handleOtpChange(val, index)}
                    ref={(ref) => (inputs.current[index] = ref)}
                    autoFocus={index === 0}
                    returnKeyType="done"
                    textAlign="center"
                  />
                ))}
              </View>

              <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
                <Text style={styles.verifyText}>Verify code</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },
  headerTabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginHorizontal: 24,
    paddingVertical: 8,
  },
  activeTab: {
    color: "#2F80ED",
    borderBottomWidth: 2,
    borderBottomColor: "#2F80ED",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#222",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 14,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordInput: {
    flex: 1,
    marginBottom: 14,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: 6,
  },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  strengthMeter: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  strengthBar: {
    flex: 1,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  strengthText: {
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 14,
  },
  forgotPasswordWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPassword: {
    color: "#2F80ED",
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    marginBottom: 14,
    justifyContent: "center",
  },
  socialText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
  },
  signupPrompt: {
    fontSize: 14,
    textAlign: "center",
    color: "#444",
  },
  signupLink: {
    color: "#2F80ED",
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalSubtext: {
    fontSize: 16,
    marginBottom: 24,
    color: "#444",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: (width - 24 * 2 - 16 * 4) / 5, // calculate width with padding & margin
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  verifyButton: {
    marginTop: 30,
    backgroundColor: "#2F80ED",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
