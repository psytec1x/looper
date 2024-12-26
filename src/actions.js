import { HttpError } from 'wasp/server';

export const createAudioTrack = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  const newAudioTrack = await context.entities.AudioTrack.create({
    data: {
      name: args.name,
      length: args.length,
      effects: args.effects,
      equalizer: args.equalizer,
      user: { connect: { id: context.user.id } }
    }
  });
  return newAudioTrack;
};

export const addSampleToTrack = async ({ audioTrackId, filePath }, context) => {
  if (!context.user) { throw new HttpError(401); }
  
  const audioTrack = await context.entities.AudioTrack.findUnique({
    where: { id: audioTrackId },
    include: { user: true }
  });
  
  if (audioTrack.user.id !== context.user.id) { throw new HttpError(403); }
  
  const newSample = await context.entities.Sample.create({
    data: { filePath, audioTrackId }
  });
  
  return context.entities.AudioTrack.findUnique({
    where: { id: audioTrackId },
    include: { samples: true }
  });
};
