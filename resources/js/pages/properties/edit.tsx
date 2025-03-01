"use client"

import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Image {
  id: number;
  image_url: string;
}

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  square_meter: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: string;
  images: Image[];
}

interface EditProps {
  property: Property;
}

export default function Edit({ property }: EditProps) {
  const { data, setData, put, processing, errors } = useForm({
    title: property.title,
    description: property.description,
    price: property.price,
    type: property.type,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    square_meter: property.square_meter,
    address: property.address,
    city: property.city,
    state: property.state,
    zip: property.zip,
    status: property.status,
    images: [] as File[],
    delete_images: [] as number[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route("properties.update", property.id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setData("images", Array.from(e.target.files));
    }
  };

  const toggleDeleteImage = (id: number) => {
    if (data.delete_images.includes(id)) {
      setData("delete_images", data.delete_images.filter((imgId: number) => imgId !== id));
    } else {
      setData("delete_images", [...data.delete_images, id]);
    }
  };

  const breadcrumbs = [
    { title: "Properties", href: route("properties.index") },
    { title: property.title, href: route("properties.show", property.id) },
    { title: "Edit", href: route("properties.edit", property.id) },
  ];

  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${property.title}`} />
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Property</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                  placeholder="Property title"
                />
                {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  placeholder="Property description"
                  className="w-full p-2 border rounded"
                  rows={4}
                ></textarea>
                {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
              </div>

              {/* Price & Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={data.price}
                    onChange={(e) => setData("price", Number(e.target.value))}
                    placeholder="Price"
                  />
                  {errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={data.type} onValueChange={(value) => setData("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <div className="text-red-600 text-sm">{errors.type}</div>}
                </div>
              </div>

              {/* Bedrooms, Bathrooms & Area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={data.bedrooms}
                    onChange={(e) => setData("bedrooms", Number(e.target.value))}
                    placeholder="Bedrooms"
                  />
                  {errors.bedrooms && <div className="text-red-600 text-sm">{errors.bedrooms}</div>}
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={data.bathrooms}
                    onChange={(e) => setData("bathrooms", Number(e.target.value))}
                    placeholder="Bathrooms"
                  />
                  {errors.bathrooms && <div className="text-red-600 text-sm">{errors.bathrooms}</div>}
                </div>
                <div>
                  <Label htmlFor="square_meter">Square Meters</Label>
                  <Input
                    id="square_meter"
                    type="number"
                    value={data.square_meter}
                    onChange={(e) => setData("square_meter", Number(e.target.value))}
                    placeholder="Square Meters"
                  />
                  {errors.square_meter && <div className="text-red-600 text-sm">{errors.square_meter}</div>}
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={data.address}
                  onChange={(e) => setData("address", e.target.value)}
                  placeholder="Address"
                />
                {errors.address && <div className="text-red-600 text-sm">{errors.address}</div>}
              </div>

              {/* City, State & Zip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    placeholder="City"
                  />
                  {errors.city && <div className="text-red-600 text-sm">{errors.city}</div>}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    value={data.state}
                    onChange={(e) => setData("state", e.target.value)}
                    placeholder="State"
                  />
                  {errors.state && <div className="text-red-600 text-sm">{errors.state}</div>}
                </div>
                <div>
                  <Label htmlFor="zip">Zip</Label>
                  <Input
                    id="zip"
                    type="text"
                    value={data.zip}
                    onChange={(e) => setData("zip", e.target.value)}
                    placeholder="Zip"
                  />
                  {errors.zip && <div className="text-red-600 text-sm">{errors.zip}</div>}
                </div>
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={data.status} onValueChange={(value) => setData("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for_sale">For Sale</SelectItem>
                    <SelectItem value="for_rent">For Rent</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <div className="text-red-600 text-sm">{errors.status}</div>}
              </div>

              {/* Existing Images */}
              <div>
                <Label>Existing Images</Label>
                {property.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {property.images.map((img) => (
                      <div key={img.id} className="relative">
                        <img
                          src={`/storage/${img.image_url}`}
                          alt={`Image ${img.id}`}
                          className={`w-full h-32 object-cover rounded ${data.delete_images.includes(img.id) ? "opacity-50" : ""}`}
                        />
                        <button
                          type="button"
                          onClick={() => toggleDeleteImage(img.id)}
                          className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                        >
                          {data.delete_images.includes(img.id) ? "Undo" : "Delete"}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">No images available</div>
                )}
              </div>

              {/* New Images */}
              <div>
                <Label htmlFor="images">Upload New Images</Label>
                <Input id="images" type="file" multiple onChange={handleFileChange} />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4">
                <Button type="submit" disabled={processing}>
                  Update Property
                </Button>
                <Link href={route("properties.show", property.id)}>
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppHeaderLayout>
  );
}
