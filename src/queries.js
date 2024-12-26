import { HttpError } from 'wasp/server'

export const getUserAudioTracks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return await context.entities.AudioTrack.findMany({
    where: {
      userId: context.user.id
    },
    include: {
      samples: true
    }
  });
}

export const getAudioTrackDetails = async ({ audioTrackId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const audioTrack = await context.entities.AudioTrack.findUnique({
    where: { id: audioTrackId },
    select: {
      id: true,
      name: true,
      length: true,
      effects: true,
      equalizer: true,
      samples: {
        select: {
          id: true,
          filePath: true
        }
      }
    }
  });

  if (!audioTrack) throw new HttpError(404, 'No audio track with id ' + audioTrackId);

  return audioTrack;
}
