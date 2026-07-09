export { default as Avatoon } from './components/Avatoon';
export { default as LipSyncAvatoon } from './components/LipSyncAvatoon';
export type {
  AvatoonProps,
  AvatoonGoal,
  AvatoonHandle,
  VisemeData,
} from './types';

export {
  fromAzureVisemes,
  fromPollySpeechMarks,
  fromRhubarb,
} from './converters/visemeConverters';
export type {
  AzureVisemeEvent,
  PollySpeechMark,
  RhubarbMouthCue,
  RhubarbOutput,
} from './converters/visemeConverters';
