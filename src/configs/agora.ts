export const appID = 'b3965ab191db4e6ab05b3fd709ccdc27';
export const appCertificate = '7fccbfcd4ca24136813266dc37a9280c';

const rtcRole = {
  PUBLISHER: 1,
  SUBSCRIBER: 2
}

export type RtcRole =  keyof typeof rtcRole;