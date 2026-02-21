import React, { useState } from 'react';

const taxClasses = [
  { value: 'standard', label: 'Standard' },
  { value: 'reduced', label: 'Reduced' },
  { value: 'zero', label: 'Zero' },
];

interface AdditionalTaxRate {
  name: string;
  rate: string;
  country: string;
}

export default function TaxSettings() {
  const [enableTaxes, setEnableTaxes] = useState(false);
  const [taxClass, setTaxClass] = useState('standard');
  const [defaultRate, setDefaultRate] = useState('');
  const [additionalRates, setAdditionalRates] = useState<AdditionalTaxRate[]>([
    { name: '', rate: '', country: '' },
  ]);

  const handleAdditionalRateChange = (index: number, field: keyof AdditionalTaxRate, value: string) => {
    const updatedRates = [...additionalRates];
    updatedRates[index][field] = value;
    setAdditionalRates(updatedRates);
  };

  const handleRemoveRate = (index: number) => {
    setAdditionalRates(additionalRates.filter((_, i) => i !== index));
  };

  const handleAddRate = () => {
    setAdditionalRates([...additionalRates, { name: '', rate: '', country: '' }]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save logic here
    alert('Tax settings saved!');
  };

  return (
    <form onSubmit={handleSave} className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Tax</h1>
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Tax Settings</h2>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={enableTaxes}
              onChange={e => setEnableTaxes(e.target.checked)}
              className="mr-2"
            />
            Enable taxes
          </label>
          <label className="block mb-4">
            Tax class
            <select
              value={taxClass}
              onChange={e => setTaxClass(e.target.value)}
              className="block w-full mt-1 border rounded px-3 py-2"
            >
              {taxClasses.map(tc => (
                <option key={tc.value} value={tc.value}>{tc.label}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block mb-4">
            Default tax rate (%)
            <input
              type="number"
              value={defaultRate}
              onChange={e => setDefaultRate(e.target.value)}
              placeholder="Default tax rate"
              className="block w-full mt-1 border rounded px-3 py-2"
            />
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Additional Tax Rates</h2>
        <table className="w-full border mb-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Rate (%)</th>
              <th className="p-2 text-left">Country/Region</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {additionalRates.map((rate, idx) => (
              <tr key={idx}>
                <td className="p-2">
                  <input
                    type="text"
                    value={rate.name}
                    onChange={e => handleAdditionalRateChange(idx, 'name', e.target.value)}
                    placeholder="Tax name"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={rate.rate}
                    onChange={e => handleAdditionalRateChange(idx, 'rate', e.target.value)}
                    placeholder="Rate"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={rate.country}
                    onChange={e => handleAdditionalRateChange(idx, 'country', e.target.value)}
                    placeholder="Country/Region"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="p-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveRate(idx)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={handleAddRate}
          className="mb-4 bg-blue-100 px-4 py-2 rounded hover:bg-blue-200"
        >
          + Add Tax Rate
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded text-lg font-semibold hover:bg-blue-700"
      >
        Save Tax Settings
      </button>
    </form>
  );
}
