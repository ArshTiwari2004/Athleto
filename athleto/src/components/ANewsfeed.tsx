"use client"
import { useState } from "react"
import { Heart, MapPin, Building2, Share2, ThumbsUp, ChevronLeft, ChevronRight, UserPlus } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import AthleteNavbar from "./AthleteNavbar"
import Chatbot from "./Chatbot"

const ANewsFeed = ({ brandDetails }: { brandDetails: any }) => {
  const [activeTab, setActiveTab] = useState("all")
  const [favorites, setFavorites] = useState<string[]>([])
  const [likes, setLikes] = useState<{ [key: number]: number }>({})
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [followedBrands, setFollowedBrands] = useState<string[]>([])

const [posts, setPosts] = useState([
    {
      id: 1,
      brand: "Puma India",
      title: "Puma Unveils High-Tech Goalkeeper Gloves with Gurpreet Singh Sandhu",
      price: "₹7,500",
      location: "India, Bengaluru",
      date: "10.03.2025",
      type: "Product Endorsement",
      description:"Puma India has launched advanced goalkeeper gloves in collaboration with Indian national team star Gurpreet Singh Sandhu. These gloves feature superior grip, shock absorption, and breathable fabric for maximum performance under pressure.",
      images: [
        "/n3.jpg?height=400&width=400",
        "/n4.png?height=400&width=600",
        
      ],
      brandlogo: "/puma.png?height=40&width=40",
    },
    {  
      id: 2,
      brand: "Adidas India",
      title: "Adidas Sponsors Indian Football Team",
      price: "Undisclosed",
      location: "India, Delhi",
      date: "20.07.2023",
      type: "Team Sponsorship",
      description:
        "Adidas India has announced a multi-year sponsorship deal with the Indian National Football Team. This partnership aims to boost the development of football in India.",
      image: "/n5.png?height=400&width=600",
      brandlogo: "/adidas.png?height=40&width=40",
    },
    {
      id: 3,
      brand: "PUMA India",
      title: "PUMA Signs Sunil Chhetri as Brand Ambassador",
      price: "₹5 Crore/Year",
      location: "India, Bangalore",
      date: "25.07.2023",
      type: "Brand Ambassador",
      description:
        "PUMA India has signed Indian football captain Sunil Chhetri as their new brand ambassador. Chhetri will be the face of PUMA's football category in India.",
      image: "/n6.png?height=400&width=600",
      brandlogo: "/puma.png?height=40&width=40",
    },
    {
      id: 4,
      brand: "Under Armour India",
      title: "Under Armour Unveils High-Performance Football Kits with Jeakson Singh",
      price:  "₹5,000",
      location: "India, Imphal",
      date: "30.07.2023",
      type: "Product Endorsement",
      description:"Under Armour India teams up with midfield powerhouse Jeakson Singh to introduce a new line of breathable, moisture-wicking football kits. These kits promise enhanced performance and comfort for both training and match days.",
      images: ["/n10.png?height=400&width=600", "/n9.png?height=400&width=600"],
      brandlogo: "/ua.png?height=40&width=40",
    },
    {
      id: 5,
      brand: "Hero Motocorp",
      title: "Hero Motocorp Announces Football Academy Sponsorship",
      price: "₹10 Crore",
      location: "India, Gurgaon",
      date: "05.08.2023",
      type: "Academy Sponsorship",
      description:
        "Hero Motocorp has announced a significant sponsorship deal with a leading football academy in India. This move aims to nurture young football talent in the country.",
      image: "/n7.png?height=400&width=600",
      brandlogo: "/hero1.avif?height=40&width=40",
    },
  ])

  // New brands section 
  const footballBrands = [
    {
      name: "Nike India",
      verified: true,
      industry: "Sportswear & Equipment",
      type: "Global Brand",
      image: "/nike.png?height=40&width=40",
    },
    {
      name: "JSW Sports",
      verified: true,
      industry: "Sports Management",
      type: "Corporate Sponsor",
      image: "/jsw.png?height=40&width=40",
    },
    {
      name: "Nivia Sports",
      verified: true,
      industry: "Sports Equipment",
      type: "Indian Manufacturer",
      image: "/nivia.png?height=40&width=40",
    },
    {
      name: "Dream11",
      verified: true,
      industry: "Fantasy Sports",
      type: "Digital Partner",
      image: "/dream11.png?height=40&width=40",
    },
    {
      name: "HCL Technologies",
      verified: true,
      industry: "Technology",
      type: "Digital Transformation Partner",
      image: "/hcl.png?height=40&width=40",
    },
    {
      name: "Fast&Up",
      verified: false,
      industry: "Sports Nutrition",
      type: "Nutrition Partner",
      image: "/fastup.png?height=40&width=40",
    }
  ]

  const brands = Object.entries(brandDetails || {}).map(([name, details]: [string, any]) => ({
    name,
    ...details,
    image: details.image || "/placeholder.svg?height=40&width=40",
  }))

  const toggleFavorite = (postId: number) => {
    setFavorites((prev) =>
      prev.includes(postId.toString()) ? prev.filter((id) => id !== postId.toString()) : [...prev, postId.toString()],
    )
  }

  const handleLike = (postId: number) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (likedPosts.includes(postId) ? -1 : 1),
    }))
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const toggleFollow = (brandName: string) => {
    setFollowedBrands((prev) =>
      prev.includes(brandName) ? prev.filter((name) => name !== brandName) : [...prev, brandName]
    )
  }

  const filteredPosts =
    activeTab === "favorites" ? posts.filter((post) => favorites.includes(post.id.toString())) : posts

  const ImageCarousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    return (
      <div className="relative">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-64 rounded-lg object-cover mt-4"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <AthleteNavbar />
      <div className="flex flex-1 gap-8 p-8">
        {/*tabs*/}
        <div className="flex-1 space-y-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 transition-colors font-medium ${
                    activeTab === "all"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  ALL NEWS
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`px-4 py-2 transition-colors font-medium ${
                    activeTab === "favorites"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  NEWS FROM FAVOURITES
                </button>
              </div>
            </div>
          </div>

          {/*Post Cards with Scrollbar*/}
          <div className="space-y-6 h-[calc(100vh-200px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow w-full mx-auto border-none"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={post.brandlogo || "/placeholder.svg"}
                        alt={post.brand}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-black text-xl font-bold">{post.brand}</h3>
                        <p className="text-sm text-muted-foreground">Posted {post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 font-medium">
                        {post.price}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(post.id)}
                        className={`${likedPosts.includes(post.id) ? "text-indigo-600" : "text-gray-400"}`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span className="ml-1 text-sm">{likes[post.id] || 0}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(post.id)}
                        className={`${favorites.includes(post.id.toString()) ? "text-red-500" : "text-gray-400"}`}
                      >
                        <Heart
                          className="h-5 w-5"
                          fill={favorites.includes(post.id.toString()) ? "currentColor" : "none"}
                        />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <h2 className="text-md font-semibold mb-4 text-gray-900">{post.title}</h2>

                  <div className="flex items-center gap-6 mb-4 text-gray-600">
                    <div className="flex items-center gap-2 font-medium">
                      <Building2 className="h-5 w-5" />
                      <span className="text-md text-muted-foreground">{post.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm">{post.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-900 text-sm leading-relaxed">{post.description}</p>

                  {post.images ? (
                    <ImageCarousel images={post.images} />
                  ) : post.image ? (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg mt-4"
                    />
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/*New Brands Card with Scrollbar*/}
        <div className="w-80">
          <Card className="bg-white shadow-sm sticky top-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">NEW BRANDS</h2>
              <div className="h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-6">
                  {footballBrands.map((brand, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={brand.image || "/placeholder.svg"}
                          alt={brand.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{brand.name}</h3>
                          {brand.verified && (
                            <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
                              Verified
                            </Badge>
                          )}
                          <p className="text-sm text-gray-500">{brand.industry}</p>
                          <span className="text-xs text-gray-400">{brand.type}</span>
                        </div>
                      </div>
                      <Button
                        variant={followedBrands.includes(brand.name) ? "default" : "outline"}
                        size="sm"
                        className={`h-6 px-2 ${
                          followedBrands.includes(brand.name) 
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                            : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                        }`}
                        onClick={() => toggleFollow(brand.name)}
                      >
                        <UserPlus className="h-2 w-2 mr-1" />
                        <span className="text-xs">
                          {followedBrands.includes(brand.name) ? "Following" : "Follow"}
                        </span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Chatbot/>
    </div>
  )
}

export default ANewsFeed