import { Head, useForm } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { BreadcrumbItem } from '@/types';

export default function AddProperty() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        square_meter: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        type: '',
        status: '',
        images: [] as File[]
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Add Property',
            href: '/addproperty',
        },
    ];
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('properties.store'));
    };

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Property" />
            
            <div className="container mx-auto ">
                <div className=" rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-semibold mb-6">Add New Property</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Property Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Enter property title"
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Property Type
                                </label>
                                <select 
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-background"
                                >
                                    <option value="">Select type</option>
                                    <option value="house">House</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="villa">Villa</option>
                                </select>
                                {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Status
                                </label>
                                <select 
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 bg-background"
                                >
                                    <option value="">Select status</option>
                                    <option value="for_sale">For Sale</option>
                                    <option value="for_rent">For Rent</option>
                                    <option value="sold">Sold</option>
                                    <option value="rented">Rented</option>
                                </select>
                                {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Enter price"
                                    min="0"
                                />
                                {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Bedrooms
                                </label>
                                <input
                                    type="number"
                                    value={data.bedrooms}
                                    onChange={e => setData('bedrooms', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Number of bedrooms"
                                    min="0"
                                />
                                {errors.bedrooms && <div className="text-red-500 text-sm mt-1">{errors.bedrooms}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Bathrooms
                                </label>
                                <input
                                    type="number"
                                    value={data.bathrooms}
                                    onChange={e => setData('bathrooms', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Number of bathrooms"
                                    min="0"
                                />
                                {errors.bathrooms && <div className="text-red-500 text-sm mt-1">{errors.bathrooms}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Square meter
                                </label>    
                                <input
                                    type="number"
                                    value={data.square_meter}
                                    onChange={e => setData('square_meter', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Square meter"
                                    min="0"
                                />
                                {errors.square_meter && <div className="text-red-500 text-sm mt-1">{errors.square_meter}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Enter address"
                                />
                                {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={e => setData('city', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Enter city"
                                />
                                {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={data.state}
                                    onChange={e => setData('state', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Enter state (2 letters)"
                                    maxLength={2}
                                />
                                {errors.state && <div className="text-red-500 text-sm mt-1">{errors.state}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Zip Code
                                </label>
                                <input
                                    type="text"
                                    value={data.zip}
                                    onChange={e => setData('zip', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    placeholder="Enter zip code"
                                    maxLength={5}
                                />
                                {errors.zip && <div className="text-red-500 text-sm mt-1">{errors.zip}</div>}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 h-32"
                                placeholder="Enter property description"
                            />
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Images
                            </label>
                            <input
                                type="file"
                                onChange={e => setData('images', Array.from(e.target.files || []))}
                                className="w-full"
                                multiple
                                accept="image/jpeg,image/png,image/jpg,image/gif"
                            />
                            {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images}</div>}
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                            >
                                {processing ? 'Adding Property...' : 'Add Property'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
