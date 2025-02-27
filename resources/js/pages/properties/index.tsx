"use client"

import { useState, useEffect, useCallback } from "react"
import { Head, Link, router } from "@inertiajs/react"
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import type { BreadcrumbItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Home, MapPin, ArrowUpDown, Search, Plus } from "lucide-react"

interface Image {
  id: number
  property_id: number
  image_url: string
}

interface Property {
  id: number
  title: string
  description: string
  price: number
  type: string
  bedrooms: number
  bathrooms: number
  square_meter: number
  address: string
  city: string
  state: string
  zip: string
  status: string
  images: Image[]
}

interface IndexProps {
  properties: Property[]
}

export default function Index({ properties }: IndexProps) {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties)
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    city: "",
  })
  const [sortBy, setSortBy] = useState("newest")

  const handleFilter = useCallback(() => {
    const filtered = properties.filter((property) => {
      return (
        (filters.type === "all" || property.type === filters.type) &&
        (filters.status === "all" || property.status === filters.status) &&
        (filters.minPrice === "" || property.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === "" || property.price <= Number(filters.maxPrice)) &&
        (filters.minBedrooms === "" || property.bedrooms >= Number(filters.minBedrooms)) &&
        (filters.city === "" || property.city.toLowerCase().includes(filters.city.toLowerCase()))
      )
    })

    // Sort properties
    if (sortBy === "price_low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price_high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      // Assuming the properties are already sorted by latest in the controller
      // If not, you might need to add a 'created_at' field and sort by that
    }

    setFilteredProperties(filtered)
  }, [properties, filters, sortBy])

  useEffect(() => {
    handleFilter()
  }, [handleFilter])

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Properties",
      href: route("properties.index"),
    },
  ]

  const handleDelete = (id: number) => {
    router.delete(route("properties.destroy", id))
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "for_sale":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "for_rent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "sold":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "rented":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const formatStatus = (status: string) => {
    return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <AppHeaderLayout breadcrumbs={breadcrumbs}>
      <Head title="Property Listings" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Property Listings</h1>
            <p className="text-muted-foreground">
              {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
            </p>
          </div>
          <Link href={route("properties.create")}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <Label htmlFor="type">Property Type</Label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="for_sale">For Sale</SelectItem>
                    <SelectItem value="for_rent">For Rent</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="minPrice">Min Price</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="maxPrice">Max Price</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="minBedrooms">Min Bedrooms</Label>
                <Input
                  id="minBedrooms"
                  type="number"
                  placeholder="Min Bedrooms"
                  value={filters.minBedrooms}
                  onChange={(e) => setFilters({ ...filters, minBedrooms: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full sm:w-auto">
              <Label htmlFor="sortBy" className="mr-2">
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sortBy" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    <div className="flex items-center">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Newest First
                    </div>
                  </SelectItem>
                  <SelectItem value="price_low">
                    <div className="flex items-center">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Price: Low to High
                    </div>
                  </SelectItem>
                  <SelectItem value="price_high">
                    <div className="flex items-center">
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Price: High to Low
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardFooter>
        </Card>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No properties found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  {property.images && property.images.length > 0 ? (
                    <img
                      src={`/storage/${property.images[0].image_url}`}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <Home className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge className={getStatusBadgeColor(property.status)}>{formatStatus(property.status)}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="font-bold text-xl">${property.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground capitalize">{property.type}</p>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <span>{property.square_meter} m²</span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {property.address}, {property.city}, {property.state} {property.zip}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Link href={route("properties.show", property.id)} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View
                    </Button>
                  </Link>
                  <Link href={route("properties.edit", property.id)} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex-1">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the property and remove the data
                          from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(property.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppHeaderLayout>
  )
}

