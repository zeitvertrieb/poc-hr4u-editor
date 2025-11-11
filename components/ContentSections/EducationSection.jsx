'use client';

// This component shows how to edit one "substack" (the education array)
export default function EducationSection({ data, onChange }) {

  // Function to add a new education entry
  const handleAddNew = () => {
    const newEntry = {
      start: "",
      end: "",
      degree: "Neuer Abschluss",
      institution: ""
    };
    // Call the parent's onChange function with the *new* array
    onChange([...data, newEntry]);
  };

  // Function to update a specific entry
  const handleEntryChange = (index, field, value) => {
    // Create a new array from the old one
    const updatedEntries = data.map((item, i) => {
      if (i === index) {
        // Create a new object for the item being changed
        return { ...item, [field]: value };
      }
      return item; // Return the original item
    });
    // Send the new array up to the parent
    onChange(updatedEntries);
  };

  // Function to delete an entry
  const handleDelete = (indexToDelete) => {
    const newArray = data.filter((_, index) => index !== indexToDelete);
    onChange(newArray);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Ausbildung</h2>
        <button
          onClick={handleAddNew}
          className="bg-primary text-white py-2 px-4 rounded font-semibold"
        >
          + Eintrag hinzufügen
        </button>
      </div>

      <div className="space-y-4">
        {data.map((entry, index) => (
          <div key={index} className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Abschluss</label>
                <input
                  type="text"
                  value={entry.degree}
                  onChange={(e) => handleEntryChange(index, 'degree', e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  type="text"
                  value={entry.institution}
                  onChange={(e) => handleEntryChange(index, 'institution', e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Start</label>
                <input
                  type="text"
                  value={entry.start}
                  onChange={(e) => handleEntryChange(index, 'start', e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Ende</label>
                <input
                  type="text"
                  value={entry.end}
                  onChange={(e) => handleEntryChange(index, 'end', e.target.value)}
                  className="mt-1 w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            {/* Delete Button */}
            <div className="text-right mt-4">
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Löschen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}