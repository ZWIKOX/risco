"use client"

import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bed, Bath, MapPin, Home } from "lucide-react";

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

interface ShowProps {
  property: Property;
}

export default function Show({ property }: ShowProps) {
  const breadcrumbs = [
    { title: "Properties", href: route("properties.index") },
    { title: property.title, href: route("properties.show", property.id) },
  ];

  const formattedPrice = property.price.toLocaleString();
  const formattedStatus = property.status.replace("_", " ").toUpperCase();

  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title={property.title} />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Property Details */}
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold">{property.title}</CardTitle>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-semibold text-green-600">${formattedPrice}</span>
              <Badge variant="secondary">{formattedStatus}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{property.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <span>{property.square_meter} m²</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>
                {property.address}, {property.city}, {property.state} {property.zip}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Images Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          {property.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {property.images.map((img) => (
                <div key={img.id} className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={`/storage/${img.image_url}`}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg">
              <Home className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href={route("properties.edit", property.id)}>
            <Button>Edit Property</Button>
          </Link>
          <Link href={route("properties.index")}>
            <Button variant="outline">Back to Listings</Button>
          </Link>
        </div>
      </div>
    </AppHeaderLayout>
  );
}
