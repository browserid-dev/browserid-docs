---
outline: deep
---

# Privacy Preservation

BrowserID is designed with a strong focus on user privacy, addressing the challenge of balancing seamless user experiences with robust privacy safeguards. Here's how BrowserID ensures privacy preservation:

## No Cookies or Device Fingerprinting

Unlike traditional authentication methods, BrowserID does not rely on cookies or device fingerprinting. This approach significantly enhances user privacy by avoiding common tracking techniques that can compromise user data.

## Cryptographic Keypair Technology

BrowserID leverages cryptographic keypair technology to securely identify and trust a user's browser. This method provides a high level of security without sacrificing privacy.

## Secure Storage

### Browser Storage

- The private key and user ID are securely stored in the user's browser's IndexedDB.
- IndexedDB follows the same-origin policy, similar to secure cookies, ensuring that the private key and nonce are only accessible by the same website/hostname.
- The private key never leaves the user's browser, maintaining a high level of privacy and security.

### Server Storage

- Only the public key is stored on BrowserID servers.
- The public key is stored within the user's instance of BrowserID and is only accessible using a combination of a nonce, user ID, and additional security checks.

## User ID Handling

- The user ID is provided by the user or your service at runtime.

## Compliance with Privacy Standards

BrowserID's approach to privacy preservation aligns with global privacy standards and user expectations, making it easier for businesses to comply with regulations such as GDPR and CCPA.

## Scalability and Isolation

- Each user initiates a unique instance of BrowserID with its own persisted storage.
- Only this instance has access to the specific user's public key.
- In the highly unlikely event that one user's instance is compromised, it only affects that specific user and not other users.

## Optional Server-Side Verification

For scenarios requiring higher security, BrowserID offers a server-side verification option. This allows for more robust security checks while still maintaining a high degree of privacy.

## User Control

Users or services can rotate their keypair as often as they like, providing an additional layer of control over their privacy and security.

By implementing these privacy-preserving features, BrowserID offers a secure, privacy-friendly authentication solution that doesn't compromise on user experience or security.
