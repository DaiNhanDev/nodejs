import { BadRequestError } from "../../utils/error.response";
import { updateItem, get } from '../../firebase';
export class ChannelBase {
  userId;
  channel_name;
  channel_type: string;

  constructor({
    userId,
    channel_name,
    channel_type
  }) {
    this.userId = userId;
    this.channel_name = channel_name;
    this.channel_type = channel_type;
  }

  async voiceCalling(hostId, audienceId, roomId) {
    if(!roomId) {

    }
    // updateItem
  }

  async videoCalling(hostId, audienceId, roomId) {
    if(!roomId) {

    }
    // updateItem
  }

  async createLivestream(hostId) {

  }

  async acceptCalling(hostId, audienceId) {
  }

  async rejectCalling(hostId, audienceId) {
  }

  async createChannel(userId) {
  }
}
