import { appID, appCertificate } from "../../configs/agora";
import { RtcTokenBuilder } from "agora-token";

class AgoraService {
  /**
   * generateRtcToken
   */
  static async generateRtcToken({ channelName, uid, role }) {
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const tokenAgora = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs,
      privilegeExpiredTs
    );

    console.log("Token With Integer Number Uid: " + tokenAgora);
    return tokenAgora;
  }
}

export { AgoraService };
