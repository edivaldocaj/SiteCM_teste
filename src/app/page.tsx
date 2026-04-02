import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { PracticeAreasGrid } from '@/components/sections/PracticeAreasGrid'
import { CriminalUrgency } from '@/components/sections/CriminalUrgency'
import { AboutPartners } from '@/components/sections/AboutPartners'
import { FeaturedCampaigns } from '@/components/sections/FeaturedCampaigns'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { NewsSection } from '@/components/sections/NewsSection'
import { RecentPosts } from '@/components/sections/RecentPosts'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 3600

async function getHomeData() {
  try {
    const payload = await getPayloadClient()
    if (!payload) return { campaigns: [], testimonials: [], posts: [], news: [] }

    const [campaigns, testimonials, posts, news] = await Promise.all([
      payload.find({ collection: 'campaigns', where: { status: { equals: 'active' }, featuredOnHomepage: { equals: true } }, limit: 3, sort: '-createdAt' }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'testimonials', where: { featured: { equals: true } }, limit: 6, sort: '-createdAt' }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, limit: 3, sort: '-publishedAt' }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'news-articles', where: { status: { equals: 'published' } }, limit: 4, sort: '-publishedAt' }).catch(() => ({ docs: [] })),
    ])

    return {
      campaigns: campaigns.docs || [],
      testimonials: testimonials.docs || [],
      posts: posts.docs || [],
      news: news.docs || [],
    }
  } catch {
    return { campaigns: [], testimonials: [], posts: [], news: [] }
  }
}

export default async function HomePage() {
  const data = await getHomeData()

  return (
    <>
      <HeroSection />
      <TrustBar />
      <PracticeAreasGrid />
      <CriminalUrgency />
      <AboutPartners />
      <FeaturedCampaigns cmsCampaigns={data.campaigns} />
      <TestimonialsCarousel cmsTestimonials={data.testimonials} />
      <NewsSection cmsNews={data.news} />
      <RecentPosts cmsPosts={data.posts} />
      <ContactCTA />
    </>
  )
}
