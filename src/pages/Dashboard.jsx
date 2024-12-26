import React, { useState } from 'react';
import { useQuery, useAction, getUserAudioTracks, createAudioTrack } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const DashboardPage = () => {
  const { data: audioTracks, isLoading, error } = useQuery(getUserAudioTracks);
  const createAudioTrackFn = useAction(createAudioTrack);
  const [newTrackName, setNewTrackName] = useState('');
  const [newTrackLength, setNewTrackLength] = useState(0);
  const [newTrackEffects, setNewTrackEffects] = useState('');
  const [newTrackEqualizer, setNewTrackEqualizer] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateAudioTrack = () => {
    createAudioTrackFn({
      name: newTrackName,
      length: newTrackLength,
      effects: newTrackEffects,
      equalizer: newTrackEqualizer
    });
    setNewTrackName('');
    setNewTrackLength(0);
    setNewTrackEffects('');
    setNewTrackEqualizer('');
  };

  return (
    <div className='p-4 bg-gray-900 text-white min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-4'>Your Audio Tracks</h1>
        <div className='flex gap-x-4 items-center'>
          <input
            type='text'
            placeholder='Track Name'
            className='px-2 py-1 border rounded text-black'
            value={newTrackName}
            onChange={(e) => setNewTrackName(e.target.value)}
          />
          <input
            type='number'
            placeholder='Length'
            className='px-2 py-1 border rounded text-black'
            value={newTrackLength}
            onChange={(e) => setNewTrackLength(parseInt(e.target.value))}
          />
          <input
            type='text'
            placeholder='Effects'
            className='px-2 py-1 border rounded text-black'
            value={newTrackEffects}
            onChange={(e) => setNewTrackEffects(e.target.value)}
          />
          <input
            type='text'
            placeholder='Equalizer'
            className='px-2 py-1 border rounded text-black'
            value={newTrackEqualizer}
            onChange={(e) => setNewTrackEqualizer(e.target.value)}
          />
          <button
            onClick={handleCreateAudioTrack}
            className='bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white font-bold rounded'
          >
            Add Track
          </button>
        </div>
      </div>
      <div>
        {audioTracks.map((track) => (
          <div
            key={track.id}
            className='p-4 mb-4 bg-gray-800 rounded-lg'
          >
            <h2 className='text-xl font-semibold'>{track.name}</h2>
            <p>Length: {track.length} seconds</p>
            <p>Effects: {track.effects}</p>
            <p>Equalizer: {track.equalizer}</p>
            <div className='mt-2'>
              <h3 className='font-semibold'>Samples:</h3>
              {track.samples.map(sample => (
                <p key={sample.id} className='ml-4'>- {sample.filePath}</p>
              ))}
            </div>
            <Link
              to={`/track/${track.id}`}
              className='text-blue-400 hover:underline mt-2 block'
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
