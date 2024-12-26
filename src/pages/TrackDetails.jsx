import React, { useState } from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction, getAudioTrackDetails, addSampleToTrack } from 'wasp/client/operations';

const TrackDetailsPage = () => {
  const { trackId } = useParams();
  const { data: track, isLoading, error } = useQuery(getAudioTrackDetails, { trackId });
  const addSampleToTrackFn = useAction(addSampleToTrack);
  const [newSamplePath, setNewSamplePath] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error.message;

  const handleAddSample = () => {
    if (newSamplePath) {
      addSampleToTrackFn({ audioTrackId: trackId, filePath: newSamplePath });
      setNewSamplePath('');
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Track Details: {track.name}</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Settings</h2>
        <p>Length: {track.length} seconds</p>
        <p>Effects: {track.effects}</p>
        <p>Equalizer: {track.equalizer}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Samples</h2>
        {track.samples.length > 0 ? (
          <ul className="list-disc ml-6">
            {track.samples.map(sample => (
              <li key={sample.id}>{sample.filePath}</li>
            ))}
          </ul>
        ) : (
          <p>No samples available.</p>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Add New Sample</h2>
        <input
          type="text"
          value={newSamplePath}
          onChange={(e) => setNewSamplePath(e.target.value)}
          placeholder="Sample file path"
          className="px-2 py-1 border rounded text-black"
        />
        <button
          onClick={handleAddSample}
          className="ml-2 bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded"
        >
          Add Sample
        </button>
      </div>
    </div>
  );
};

export default TrackDetailsPage;
