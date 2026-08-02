// NOTE on images: Monarch Beach and Emerald Bay didn't have per-area
// photography in your screenshots (just the page copy), so their images
// below are pulled from your /project*.jpg gallery — matched by content
// (pool/resort shots for Monarch Beach, coastal/kitchen/fire-feature shots
// for Emerald Bay) and chosen so they don't repeat any image already used
// by Newport Coast, Corona del Mar, Shady Canyon, or Pelican Hill. Swap
// any of these for real per-area photography whenever you have it.
//
// Monarch Beach's screenshots didn't include a "Why Aluminum" section
// (only hero, styles, add-ons, and process), so `why` is left as `null`
// rather than inventing copy — add it the same shape as the other areas
// once you have that content.

export const areas = [
  {
    id: 1,
    slug: "newport-coast",
    name: "Newport Coast",
    cardImage:
      "https://alumascape.com/wp-content/uploads/2025/05/project6-2.jpg",
    cardBlurb:
      "Modern, durable, fire-safe patio covers engineered for Newport Coast's upscale coastal architecture.",
    hero: {
      image: "https://alumascape.com/wp-content/uploads/2025/05/project6-2.jpg",
      title: "Custom Aluminum Patio Covers for Luxury Homes in Newport Coast",
      paragraphs: [
        "Looking for a modern, durable, and fire-safe patio cover in Newport Coast? At Alumascape, we design and install custom aluminum patio covers that perfectly match the upscale architecture and outdoor lifestyle of this coastal community.",
        "From louvered smart systems to sleek solid roofs, our patio covers transform your backyard into a resort-style living space.",
      ],
    },
    why: {
      title: "Why Newport Coast Homeowners Choose Aluminum Over Wood",
      intro:
        "Newport Coast is known for its luxury estates, ocean views, and high fire-risk zones. Traditional wood patio covers simply don't hold up here. Our extruded aluminum systems are engineered for California's climate and HOA requirements:",
      list: [
        "Non-combustible and fire-safe",
        "15-year powder coat warranty on finish",
        "Low maintenance — no rot, termites, or repainting",
        "Modern designs that complement luxury architecture",
      ],
      image: "https://alumascape.com/wp-content/uploads/2025/05/project6-3.jpg",
    },
    styles: {
      title: "Our Patio Cover Styles in Newport Coast",
      image: "https://alumascape.com/wp-content/uploads/2025/05/project6-4.jpg",
      items: [
        {
          title: "Louvered Patio Covers (Motorized)",
          text: "Control sun, shade, and airflow with the touch of a button. Perfect for ocean-view terraces and poolside retreats.",
        },
        {
          title: "Solid Roof Covers",
          text: "A clean, seamless look that provides full shade. Ideal for outdoor kitchens and permanent entertaining spaces.",
        },
        {
          title: "Lattice Covers",
          text: "A timeless style with filtered shade — perfect for gardens, breezeways, or accent areas.",
        },
      ],
    },
    addOns: {
      title: "Custom Luxury Features",
      intro:
        "We specialize in upgrades that elevate Newport Coast outdoor living:",
      list: [
        "Color-changing LED lighting",
        "Outdoor fans and built-in heaters",
        "Motorized privacy shades",
        "Integrated AV setups (TVs, speakers, and more)",
        "Accent walls with stone or tile finishes",
      ],
      images: [
        "https://alumascape.com/wp-content/uploads/2025/05/project6-5.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project6-6.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project6-1.jpg",
      ],
      cta: "Tell Us About Your Project!",
    },
    install: {
      title: "Full-Service Design & Installation",
      intro:
        "From HOA approvals to city permits, Alumascape handles every step:",
      list: [
        {
          label: "Consultation & Design",
          text: "Samples, layouts, and 3D visuals",
        },
        {
          label: "Engineering & Permits",
          text: "All paperwork handled for you",
        },
        {
          label: "Installation",
          text: "Clean, efficient, usually within 3–5 days",
        },
        {
          label: "Final Walkthrough",
          text: "We don't leave until everything is perfect",
        },
      ],
      image: "https://alumascape.com/wp-content/uploads/2025/05/project7-1.jpg",
    },
  },

  {
    id: 2,
    slug: "corona-del-mar",
    name: "Corona del Mar",
    cardImage:
      "https://alumascape.com/wp-content/uploads/2025/05/project3-2.jpg",
    cardBlurb:
      "Stylish, low-maintenance aluminum patio covers built for the coastal homes of Corona del Mar.",
    hero: {
      image: "https://alumascape.com/wp-content/uploads/2025/05/project3-2.jpg",
      title: "Modern Aluminum Patio Covers in Corona del Mar",
      paragraphs: [
        "At Alumascape, we bring stylish, low-maintenance patio covers to the coastal homes of Corona del Mar.",
        "Whether you want a motorized louvered system to enjoy both sun and shade or a solid roof design for permanent coverage, our patio covers are custom-engineered to fit the upscale lifestyle of this community.",
      ],
    },
    why: {
      title: "Why Aluminum Patio Covers Work Best in Corona del Mar",
      intro:
        "Wooden structures don't last in Corona del Mar's salty air and coastal climate. Our aircraft-grade extruded aluminum covers are designed to withstand it all:",
      list: [
        "Rust-free and fire-resistant",
        "Protected with a 15-year powder coat finish",
        "HOA-friendly designs that blend with modern and traditional homes",
        "Low maintenance, built to last decades",
      ],
      image: "https://alumascape.com/wp-content/uploads/2025/05/project3-1.jpg",
    },
    styles: {
      title: "Patio Cover Options for Corona del Mar Homes",
      image: "https://alumascape.com/wp-content/uploads/2025/05/project3-3.jpg",
      items: [
        {
          title: "Motorized Louvered Covers",
          text: "Adjust your shade instantly with remote or app control. Ideal for patios overlooking the Pacific.",
        },
        {
          title: "Solid Roof Covers",
          text: "A sleek, permanent solution that provides year-round shade and comfort.",
        },
        {
          title: "Lattice Covers",
          text: "Classic design with the benefits of aluminum — no peeling, no repainting, no hassle.",
        },
      ],
    },
    addOns: {
      title: "Premium Add-Ons",
      intro:
        "Corona del Mar homeowners love to personalize their patio covers with:",
      list: [
        "Recessed LED lighting and ceiling fans",
        "Built-in heaters for evening comfort",
        "Motorized drop shades for privacy and sun protection",
        "Entertainment walls with TVs and sound systems",
        "Stone and tile finishes for a resort-style look",
      ],
      images: [
        "https://alumascape.com/wp-content/uploads/2025/05/project3-4.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project3-5.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project3-6.jpg",
      ],
      cta: "Tell Us About Your Project!",
    },
    install: null,
  },

  {
    id: 3,
    slug: "shady-canyon",
    name: "Shady Canyon",
    cardImage:
      "https://alumascape.com/wp-content/uploads/2025/05/project11-2.jpg",
    cardBlurb:
      "Luxury aluminum patio covers designed for the elegance, privacy, and views of Shady Canyon estates.",
    hero: {
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project11-2.jpg",
      title: "Custom Aluminum Patio Covers in Shady Canyon",
      paragraphs: [
        "Shady Canyon homes are known for their elegance, privacy, and stunning views. At Alumascape, we design and install luxury aluminum patio covers that perfectly complement this exclusive community.",
        "Whether you want a motorized louvered system for your backyard retreat or a sleek, solid roof for year-round comfort, we build outdoor spaces that feel like a natural extension of your home.",
      ],
    },
    why: {
      title: "Why Shady Canyon Homeowners Upgrade to Aluminum",
      intro:
        "Wooden patio structures simply don't meet the long-term needs of Shady Canyon estates. Our extruded aluminum patio covers are engineered to withstand fire-risk zones, HOA standards, and Orange County's climate. Benefits include:",
      list: [
        "Fire-safe and non-combustible construction",
        "15-year powder coat finish warranty",
        "Low-maintenance elegance with no rot, peeling, or termites",
        "Architecturally refined designs that suit luxury properties",
      ],
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project11-1.jpg",
    },
    styles: {
      title: "Patio Cover Styles for Shady Canyon Homes",
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project11-3.jpg",
      items: [
        {
          title: "Motorized Louvered Covers",
          text: "Smart, adjustable roofs controlled by app or remote.",
        },
        {
          title: "Solid Roof Covers",
          text: "Clean, modern shade structures ideal for outdoor kitchens or dining terraces.",
        },
        {
          title: "Lattice Covers",
          text: "A timeless design offering filtered light and style.",
        },
      ],
    },
    addOns: {
      title: "Custom Luxury Add-Ons",
      intro: "Enhance your Shady Canyon backyard with:",
      list: [
        "Ambient or color-changing LED lighting",
        "Outdoor fans and heaters for year-round comfort",
        "Motorized privacy and sun shades",
        "Built-in AV systems with speakers and TVs",
        "Stone or tile accent walls with integrated fireplaces",
      ],
      images: [
        "https://alumascape.com/wp-content/uploads/2025/05/project11-4.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project11-5.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project11-6.jpg",
      ],
      cta: "Tell Us About Your Project!",
    },
    install: {
      title: "Full-Service Installation in Shady Canyon",
      intro: null,
      text: "We handle everything — design, HOA approval, engineering, permits, and installation. Most projects are completed in just 3–5 days. Our turnkey service means you won't need to call multiple contractors.",
      image: "https://alumascape.com/wp-content/uploads/2025/05/project8-2.jpg",
    },
  },

  {
    id: 4,
    slug: "pelican-hill",
    name: "Pelican Hill",
    cardImage:
      "https://alumascape.com/wp-content/uploads/2025/05/project9-2.jpg",
    cardBlurb:
      "Architecturally refined aluminum patio covers for the precision and elegance of Pelican Hill estates.",
    hero: {
      image: "https://alumascape.com/wp-content/uploads/2025/05/project9-2.jpg",
      title: "Custom Aluminum Patio Covers for Pelican Hill Estates",
      paragraphs: [
        "In Pelican Hill, elegance and precision define every detail — and your outdoor space should be no exception.",
        "At Alumascape, we design and install architecturally refined aluminum patio covers that enhance the luxury and comfort of your home. From motorized louvered roofs to solid shade structures, our systems bring modern functionality to Newport Coast's most prestigious neighborhood.",
      ],
    },
    why: {
      title: "Why Pelican Hill Homeowners Choose Aluminum",
      intro:
        "Pelican Hill estates demand materials that balance beauty, durability, and HOA compliance. Our extruded aluminum systems are engineered to perfection:",
      list: [
        "Fire-safe and non-combustible, ideal for high-value properties",
        "Resistant to corrosion and salt air",
        "15-year powder coat warranty for lasting color and protection",
        "Seamless integration with your home's architectural design",
      ],
      image: "https://alumascape.com/wp-content/uploads/2025/05/project9-1.jpg",
    },
    styles: {
      title: "Our Patio Cover Styles",
      image: "https://alumascape.com/wp-content/uploads/2025/05/project9-4.jpg",
      items: [
        {
          title: "Motorized Louvered Systems",
          text: "Enjoy instant control of light and shade with a phone app or remote.",
        },
        {
          title: "Solid Roof Covers",
          text: "Sleek, permanent shade built to match your home's exterior finishes.",
        },
        {
          title: "Lattice Covers",
          text: "Elegant, open designs that filter sunlight with style and symmetry.",
        },
      ],
    },
    addOns: {
      title: "Premium Customizations",
      intro: null,
      list: [
        "Integrated LED lighting and ceiling fans",
        "Discreet heaters for year-round comfort",
        "Motorized privacy and sun shades",
        "Built-in sound and entertainment systems",
        "Stone or tile accent walls with modern fireplaces",
      ],
      images: [
        "https://alumascape.com/wp-content/uploads/2025/05/project9-5.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project9-6.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project9-7.jpg",
      ],
      cta: "Tell Us About Your Project!",
    },
    install: {
      title: "A Turnkey Experience",
      intro: null,
      text: "From HOA approvals and engineering to installation and final walkthrough, we handle every detail. Most projects in Pelican Hill are completed within 3–5 days, leaving you with a polished, luxury outdoor space ready to enjoy.",
      image: "https://alumascape.com/wp-content/uploads/2025/05/project9-8.jpg",
    },
  },

  {
    id: 5,
    slug: "monarch-beach",
    name: "Monarch Beach",
    cardImage:
      "https://alumascape.com/wp-content/uploads/2025/05/project10-2.jpg",
    cardBlurb:
      "Resort-style aluminum patio covers built for Monarch Beach's ocean breezes and golf course views.",
    hero: {
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project10-2.jpg",
      title: "Aluminum Patio Covers for Monarch Beach Luxury Homes",
      paragraphs: [
        "Monarch Beach is all about resort living — ocean breezes, golf course views, and sophisticated design.",
        "At Alumascape, we create custom aluminum patio covers that perfectly complement this lifestyle, offering lasting beauty, comfort, and performance for your outdoor spaces.",
      ],
    },
    // Not present in the Monarch Beach screenshots — add once you have the copy.
    why: {
      title: "Why Aluminum is the Perfect Choice for Monarch Beach Homes",
      intro:
        "From oceanfront estates to golf course residences, Monarch Beach homeowners expect outdoor structures that combine timeless design with exceptional performance. Our aluminum patio covers offer the perfect balance of luxury, durability, and low maintenance:",
      list: [
        "Engineered to withstand coastal weather and salty ocean air",
        "Non-combustible construction for enhanced safety",
        "Premium powder-coated finish backed by a 15-year warranty",
        "Custom-crafted designs that seamlessly integrate with luxury architecture",
      ],
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project10-1.jpg",
    },
    styles: {
      title: "Choose Your Patio Cover Style",
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project12-2.jpg",
      items: [
        {
          title: "Motorized Louvered Systems",
          text: "Dynamic, remote-controlled roof panels that adapt to sunlight and weather.",
        },
        {
          title: "Solid Roof Patio Covers",
          text: "Complete shade and protection for outdoor lounges and kitchens.",
        },
        {
          title: "Lattice Aluminum Covers",
          text: "Elegant, filtered light ideal for poolside or garden areas.",
        },
      ],
      cta: "Find Out More",
    },
    addOns: {
      title: "Tailor Your Outdoor Experience",
      intro: null,
      list: [
        "LED lighting (color-changing or recessed)",
        "Built-in heaters and fans",
        "Motorized shades for wind protection",
        "Integrated AV entertainment systems",
        "Stone or stucco columns and decorative finishes",
      ],
      images: [
        "https://alumascape.com/wp-content/uploads/2025/05/project15-3.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project15-4.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project15-5.jpg",
      ],
      cta: "Tell Us About Your Project!",
    },
    install: {
      title: "Our Full-Service Process",
      intro: null,
      text: "We make it effortless — from design and permitting to installation and final walkthrough, everything is handled by the Alumascape team. Most Monarch Beach installations are completed in 3–5 days, start to finish.",
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project10-1.jpg",
    },
  },

  {
    id: 6,
    slug: "emerald-bay",
    name: "Emerald Bay",
    cardImage:
      "https://alumascape.com/wp-content/uploads/2025/05/project2-2.jpg",
    cardBlurb:
      "Custom aluminum patio covers built for Emerald Bay's Pacific views and coastal conditions.",
    hero: {
      image: "https://alumascape.com/wp-content/uploads/2025/05/project2-2.jpg",
      title: "Modern Aluminum Patio Covers for Emerald Bay Homes",
      paragraphs: [
        "In Emerald Bay, where every home overlooks the Pacific, outdoor living is a way of life.",
        "Alumascape creates custom aluminum patio covers that combine architectural beauty with functional protection — built to withstand coastal conditions while elevating your property's design.",
      ],
    },
    why: {
      title: "Why Emerald Bay Homeowners Prefer Aluminum",
      intro:
        "Coastal weather can be harsh on wood structures. Our extruded aluminum patio systems are the smart alternative:",
      list: [
        "Coastal-grade aluminum that resists rust and corrosion",
        "Fire-safe and HOA-compliant materials",
        "Virtually maintenance-free — no painting, no warping, no worries",
        "Clean, modern designs that enhance your home's value",
      ],
      image: "https://alumascape.com/wp-content/uploads/2025/05/project8-4.jpg",
    },
    styles: {
      title: "Our Patio Cover Styles",
      image: "https://alumascape.com/wp-content/uploads/2025/05/project9-3.jpg",
      items: [
        {
          title: "Louvered Roof Systems",
          text: "Smart, motorized control of sun and shade with whisper-quiet operation.",
        },
        {
          title: "Solid Roof Patio Covers",
          text: "Permanent shade for outdoor kitchens, dining, and lounge areas.",
        },
        {
          title: "Lattice Covers",
          text: "Decorative, classic structures perfect for pathways and gardens.",
        },
      ],
      cta: "Find Out More",
    },
    addOns: {
      title: "Custom Upgrades for Coastal Luxury",
      intro: null,
      list: [
        "Ambient and recessed LED lighting",
        "Integrated heaters and outdoor-rated fans",
        "Motorized drop shades for wind and privacy",
        "AV setups with built-in speakers or TVs",
        "Natural stone or tile finishes for resort-style elegance",
      ],
      images: [
        "https://alumascape.com/wp-content/uploads/2025/05/project4-3.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project4-6.jpg",
        "https://alumascape.com/wp-content/uploads/2025/05/project4-9.jpg",
      ],
      cta: "Tell Us About Your Project!",
    },
    install: {
      title: "Seamless Design to Installation",
      intro: null,
      text: "Our team manages every step — design, engineering, coastal permitting, and installation. Most Emerald Bay projects are completed in under a week, with precision craftsmanship and full compliance.",
      image:
        "https://alumascape.com/wp-content/uploads/2025/05/project13-2.jpg",
    },
  },
];
