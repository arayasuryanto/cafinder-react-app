// Sample Cafe Data for Surabaya regions
const cafeData = [
  // Surabaya Utara
  {
    id: "su-1",
    name: "Rukun Kopi Peranakan",
    region: "Surabaya Utara",
    address: "Jl. Peranakan No. 123, Surabaya Utara",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    priceRange: "$$",
    tags: ["Coffee", "Working Space", "Quiet"],
    description: "Sebuah tempat yang nyaman dengan suasana peranakan yang autentik dan kopi pilihan terbaik."
  },
  {
    id: "su-2",
    name: "Dapur Kota Coffee",
    region: "Surabaya Utara",
    address: "Jl. Kembang Jepun No. 45, Surabaya Utara",
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    priceRange: "$",
    tags: ["Local Coffee", "Breakfast", "Instagramable"],
    description: "Cafe dengan konsep industrial yang menyajikan kopi lokal dengan cita rasa tinggi."
  },
  {
    id: "su-3",
    name: "North Dock Café",
    region: "Surabaya Utara",
    address: "Jl. Pelabuhan Utara No. 78, Surabaya Utara",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    priceRange: "$$$",
    tags: ["Sea View", "Premium Coffee", "Fine Dining"],
    description: "Café premium dengan pemandangan pelabuhan yang menakjubkan dan menu kopi internasional."
  },
  
  // Surabaya Selatan
  {
    id: "ss-1",
    name: "Kopi Teras",
    region: "Surabaya Selatan",
    address: "Jl. Taman Apsari No. 15, Surabaya Selatan",
    image: "https://images.unsplash.com/photo-1529972218453-9e8fc9f3fa6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    priceRange: "$$",
    tags: ["Garden", "Outdoor", "Pet Friendly"],
    description: "Cafe dengan konsep teras dan taman yang hijau, cocok untuk bersantai di akhir pekan."
  },
  {
    id: "ss-2",
    name: "Filgud Coffee",
    region: "Surabaya Selatan",
    address: "Jl. Mayjen Sungkono No. 89, Surabaya Selatan",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    priceRange: "$$",
    tags: ["Specialty Coffee", "Brunch", "Cozy"],
    description: "Tempat yang sempurna untuk menikmati specialty coffee dengan pastry yang dibuat fresh setiap hari."
  },
  {
    id: "ss-3",
    name: "Lovebug Café",
    region: "Surabaya Selatan",
    address: "Jl. Kutisari Indah No. 123, Surabaya Selatan",
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    priceRange: "$$",
    tags: ["Romantic", "Desserts", "Date Spot"],
    description: "Café dengan nuansa romantis, menawarkan berbagai dessert premium dan minuman signature."
  },
  
  // Surabaya Barat
  {
    id: "sb-1",
    name: "Fore Coffee G-Walk",
    region: "Surabaya Barat",
    address: "Jl. G-Walk Citraland No. 35, Surabaya Barat",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    priceRange: "$$",
    tags: ["Working Space", "Free WiFi", "Modern"],
    description: "Café modern dengan fasilitas working space dan internet cepat untuk produktivitas maksimal."
  },
  {
    id: "sb-2",
    name: "G-Walk Garden",
    region: "Surabaya Barat",
    address: "Jl. G-Walk Citraland No. 67, Surabaya Barat",
    image: "https://images.unsplash.com/photo-1513267048331-5611cad62e41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    priceRange: "$$$",
    tags: ["Garden View", "Family Friendly", "Weekend Brunch"],
    description: "Café dengan konsep garden yang indah, menawarkan menu brunch lezat dan beragam minuman segar."
  },
  {
    id: "sb-3",
    name: "Ropopang Citraland",
    region: "Surabaya Barat",
    address: "Jl. Taman Internasional No. 10, Citraland, Surabaya Barat",
    image: "https://images.unsplash.com/photo-1490457843367-34b21b6ccd85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    priceRange: "$$",
    tags: ["Korean Style", "Desserts", "Youth Spot"],
    description: "Café dengan sentuhan Korea yang menawarkan berbagai dessert dan minuman kekinian."
  },
  
  // Surabaya Timur
  {
    id: "st-1",
    name: "M22 Café",
    region: "Surabaya Timur",
    address: "Jl. Manyar Kertoarjo No. 22, Surabaya Timur",
    image: "https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    priceRange: "$$",
    tags: ["Minimalist", "Art Space", "Live Music"],
    description: "Tempat nongkrong dengan konsep minimalis yang sering mengadakan pertunjukan musik live."
  },
  {
    id: "st-2",
    name: "L Spot Café",
    region: "Surabaya Timur",
    address: "Jl. Kedung Baruk No. 98, Surabaya Timur",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    priceRange: "$",
    tags: ["Student Friendly", "Affordable", "Book Corner"],
    description: "Café ramah mahasiswa dengan harga terjangkau dan sudut baca yang nyaman."
  },
  {
    id: "st-3",
    name: "Filgud+ Manyar",
    region: "Surabaya Timur",
    address: "Jl. Manyar Jaya No. 47, Surabaya Timur",
    image: "https://images.unsplash.com/photo-1507914997799-d84c6293f6a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    priceRange: "$$$",
    tags: ["Premium", "Coffee Lab", "Professional Meeting"],
    description: "Cabang premium dari Filgud Coffee dengan coffee lab dan ruang meeting profesional."
  }
];

export default cafeData;