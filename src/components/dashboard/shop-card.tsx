
import React, { useState } from "react";
import TaxSettings from "./tax-settings";
import { Store, Boxes, Image, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// ...existing code...


const ShopCard: React.FC = () => {
  const [tab, setTab] = useState<string>("start");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const handleExport = () => {
    if (products.length === 0) return;
    const header = ['name','sku','stock','price','categories','tags','date'];
    const rows = products.map(p => header.map(h => `"${(p[h] || '').replace(/"/g, '""')}"`).join(','));
    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const text = evt.target?.result as string;
      const lines = text.split(/\r?\n/);
      const header = lines[0].split(',');
      const newProducts = lines.slice(1).filter(Boolean).map(line => {
        const values = line.match(/("[^"]*"|[^,]+)/g)?.map(v => v.replace(/^"|"$/g, '')) || [];
        const obj: any = {};
        header.forEach((h, i) => { obj[h] = values[i] || ''; });
        return obj;
      });
      setProducts([...products, ...newProducts]);
    };
    reader.readAsText(file);
    e.target.value = '';
  };
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: '',
    name: '',
    sku: '',
    stock: '',
    price: '',
    categories: '',
    tags: '',
    date: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <>
      <Card className="border border-[#e0f2fe] w-full max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-2xl px-8 py-8">
        {tab === "start" ? (
          <>
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 mb-1">Are you opening your shop?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-6 mt-2">
                <Button variant="default" onClick={() => setTab("General")}>Yes</Button>
                <Button variant="outline" onClick={() => setTab("end")}>No</Button>
              </div>
            </CardContent>
          </>
        ) : tab === "end" ? (
          <div className="text-center py-8 text-lg text-gray-700">Thank you for visiting!</div>
        ) : (
          <>
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4 w-full mb-8">
                  {["General","Products","Tax","Shipping","Payments","Accounts & Privacy","Emails","Advanced"].map(t => (
                    <button
                      key={t}
                      className={`w-full px-0 py-4 rounded-lg font-semibold text-base border-b-4 transition-colors ${tab===t ? 'border-blue-600 text-blue-700 bg-blue-50 shadow' : 'border-transparent text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
                      onClick={() => setTab(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-6 mt-2 text-left w-full">{tab}</CardTitle>
            </CardHeader>
            <CardContent>
              {tab === "General" && (
                <form className="space-y-8 w-full max-w-4xl mx-auto">
                  <div>
                    <div className="text-lg font-bold mb-2">Store Address</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-medium mb-1">Address line 1</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Address line 1" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Address line 2</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Address line 2" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1">City</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="City" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Country / State</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Country / State" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Postcode / ZIP</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Postcode / ZIP" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold mb-2 mt-6">General Options</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-medium mb-1">Selling location(s)</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Selling location(s)" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Shipping location(s)</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Shipping location(s)" />
                      </div>
                      <div>
                        <label className="block font-medium mb-1">Default customer location</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Default customer location" />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <input type="checkbox" id="enable-taxes" className="h-4 w-4" />
                        <label htmlFor="enable-taxes" className="font-medium">Enable taxes</label>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" variant="default" className="mt-6 w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold text-lg">Save General Settings</Button>
                </form>
              )}
              {tab === "Products" && (
                <div className="w-full">
                  <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
                    <div className="text-2xl font-bold text-gray-900">Products</div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="font-semibold" onClick={() => setModalOpen(true)}>Add new product</Button>
                      <label>
                        <span className="sr-only">Import</span>
                        <Button variant="outline" className="font-semibold">Import</Button>
                        <input type="file" accept=".csv" style={{ display: 'none' }} onChange={handleImport} />
                      </label>
                      <Button variant="outline" className="font-semibold" onClick={handleExport}>Export</Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 text-sm text-gray-500">
                    <span>All ({products.length})</span>
                    <span className="underline cursor-pointer">Published ({products.length})</span>
                    <span className="underline cursor-pointer">Drafts (0)</span>
                    <span className="underline cursor-pointer">Sorting</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <select className="border rounded px-2 py-1 text-sm" value={bulkAction} onChange={e => setBulkAction(e.target.value)}>
                      <option value="">Bulk actions</option>
                      <option value="delete">Delete</option>
                      <option value="edit" disabled>Edit</option>
                    </select>
                    <Button
                      variant="outline"
                      className={`px-4 py-1 text-sm${bulkAction === 'delete' && selectedProducts.length > 0 ? '' : ' opacity-50 cursor-not-allowed'}`}
                      disabled={!(bulkAction === 'delete' && selectedProducts.length > 0)}
                      onClick={() => {
                        if (bulkAction === 'delete' && selectedProducts.length > 0) {
                          setProducts(products.filter((_, idx) => !selectedProducts.includes(idx)));
                          setSelectedProducts([]);
                          setBulkAction('');
                        }
                      }}
                    >Apply</Button>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Filter by category</option>
                    </select>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Filter by product type</option>
                    </select>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Filter by stock status</option>
                    </select>
                    <Button variant="outline" className="px-4 py-1 text-sm">Filter</Button>
                  </div>
                  {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl w-full relative">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => { setModalOpen(false); setImagePreview(null); }}>×</button>
                        <form onSubmit={e => {
                          e.preventDefault();
                          setProducts([...products, { ...newProduct, image: imagePreview }]);
                          setModalOpen(false);
                          setNewProduct({ image: '', name: '', sku: '', stock: '', price: '', categories: '', tags: '', date: '' });
                          setImagePreview(null);
                        }}>
                          <div className="text-lg font-bold mb-4">Add New Product</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-medium mb-1">Product Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                className="w-full border rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                style={{ backgroundColor: '#f3f4f6' }}
                                onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const url = URL.createObjectURL(file);
                                    setImagePreview(url);
                                  } else {
                                    setImagePreview(null);
                                  }
                                }}
                              />
                              {imagePreview && (
                                <div className="mt-2 w-20 h-20 flex items-center justify-center bg-gray-100 rounded">
                                  <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Name</label>
                              <input type="text" className="w-full border rounded px-3 py-2" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="Product Name" />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">SKU</label>
                              <input type="text" className="w-full border rounded px-3 py-2" value={newProduct.sku} onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} placeholder="SKU" />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Stock</label>
                              <input type="text" className="w-full border rounded px-3 py-2" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} placeholder="Stock" />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Price</label>
                              <input type="text" className="w-full border rounded px-3 py-2" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} placeholder="Price" />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Categories</label>
                              <input type="text" className="w-full border rounded px-3 py-2" value={newProduct.categories} onChange={e => setNewProduct({ ...newProduct, categories: e.target.value })} placeholder="Categories" />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Tags</label>
                              <input type="text" className="w-full border rounded px-3 py-2" value={newProduct.tags} onChange={e => setNewProduct({ ...newProduct, tags: e.target.value })} placeholder="Tags" />
                            </div>
                            <div>
                              <label className="block font-medium mb-1">Date</label>
                              <input type="text" className="w-full border rounded px-3 py-2" value={newProduct.date} onChange={e => setNewProduct({ ...newProduct, date: e.target.value })} placeholder="Date" />
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button type="submit" variant="default">Add Product</Button>
                            <Button type="button" variant="outline" onClick={() => { setModalOpen(false); setImagePreview(null); }}>Cancel</Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50 text-gray-700 text-sm">
                          <th className="p-3 font-semibold text-left">
                            <input
                              type="checkbox"
                              checked={selectedProducts.length === products.length && products.length > 0}
                              onChange={e => {
                                if (e.target.checked) {
                                  setSelectedProducts(products.map((_, idx) => idx));
                                } else {
                                  setSelectedProducts([]);
                                }
                              }}
                            />
                          </th>
                          <th className="p-3 font-semibold text-left">Name</th>
                          <th className="p-3 font-semibold text-left">SKU</th>
                          <th className="p-3 font-semibold text-left">Stock</th>
                          <th className="p-3 font-semibold text-left">Price</th>
                          <th className="p-3 font-semibold text-left">Categories</th>
                          <th className="p-3 font-semibold text-left">Tags</th>
                          <th className="p-3 font-semibold text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr><td colSpan={9} className="text-center p-6 text-gray-400">No products yet.</td></tr>
                        ) : (
                          products.map((p, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                              <td className="p-3">
                                <input
                                  type="checkbox"
                                  checked={selectedProducts.includes(i)}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      setSelectedProducts([...selectedProducts, i]);
                                    } else {
                                      setSelectedProducts(selectedProducts.filter(idx => idx !== i));
                                    }
                                  }}
                                />
                              </td>
                              <td className="p-3 flex items-center gap-2">
                                {p.image && <img src={p.image} alt="" className="w-8 h-8 rounded" />}
                                <span className="font-semibold text-blue-700 cursor-pointer hover:underline">{p.name}</span>
                              </td>
                              <td className="p-3 text-gray-700">{p.sku}</td>
                              <td className="p-3 text-green-600 font-semibold">{p.stock}</td>
                              <td className="p-3">{p.price}</td>
                              <td className="p-3 text-blue-600 cursor-pointer hover:underline">{p.categories}</td>
                              <td className="p-3">{p.tags}</td>
                              <td className="p-3 text-gray-500">{p.date}</td>
                              <td className="p-3">
                                <Button variant="destructive" size="sm" onClick={() => {
                                  setProducts(products.filter((_, idx) => idx !== i));
                                }}>Delete</Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
                {tab === "Tax" && (
                  <TaxSettings />
                )}
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default ShopCard;
