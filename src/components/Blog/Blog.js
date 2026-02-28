import React, { useState } from 'react';
import styled from 'styled-components';
import AnnouncementBar from '../shared/AnnouncementBar';
import SharedHeader from '../shared/SharedHeader';
import NewsletterFooter from '../shared/NewsletterFooter';
import Footer from '../shared/Footer';

const PageContainer = styled.div`
  background-color: #f4e8c4;
  min-height: 100vh;
  color: #3b2f20;
  font-family: 'Crimson Text', 'Times New Roman', serif;
`;

const Content = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 3rem;
  margin-bottom: 3rem;
  font-weight: 500;
  text-align: center;
`;

const BlogGrid = styled.div`
  display: grid;
  gap: 2rem;
`;

const BlogPost = styled.article`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.3s;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #3b2f20;
  }
`;

const PostDate = styled.div`
  font-size: 0.9rem;
  color: #6e6655;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h3`
  font-family: 'EB Garamond', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const PostExcerpt = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostContent = styled.div`
  line-height: 1.7;
  margin: 1.5rem 0;
  font-size: 1.05rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  h4 {
    margin: 1.5rem 0 0.75rem;
    font-size: 1.2rem;
  }
`;

const ReadMore = styled.button`
  background: transparent;
  color: #3b2f20;
  border: none;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid #3b2f20;
  padding: 0.25rem 0;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:hover {
    color: #b38728;
    border-bottom-color: #b38728;
  }
`;

const CollapseButton = styled(ReadMore)`
  margin-top: 1rem;
`;

function Blog() {
  const [expandedPost, setExpandedPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      date: 'October 1, 2025',
      title: 'The Secret Life of Honey Bees',
      excerpt: 'Ever wondered what happens inside a beehive? Discover the fascinating social structure and daily activities of these incredible pollinators.',
      content: `
        <p>Inside every beehive exists a complex society that rivals any human organization. With thousands of individuals working in perfect harmony, the hive operates like a well-oiled machine—or should we say, a well-honeyed machine?</p>
        
        <h4>The Queen's Role</h4>
        <p>The queen bee is the mother of the entire colony, laying up to 2,000 eggs per day during peak season. But she's not a ruler in the traditional sense—she's more like the heart of the hive, keeping the whole system alive and thriving.</p>
        
        <h4>Worker Bees: The True Heroes</h4>
        <p>Female worker bees do everything: nursing, cleaning, building comb, guarding the entrance, and of course, foraging for nectar and pollen. Their entire lives are dedicated to the colony's success.</p>
        
        <h4>The Waggle Dance</h4>
        <p>When a forager bee finds a great patch of flowers, she performs a "waggle dance" to communicate the exact location to her sisters. The angle of the dance relative to the sun tells direction, and the duration tells distance. It's basically GPS, but way cuter!</p>
        
        <p>Next time you drizzle honey on your toast, remember: thousands of bees worked together to create that golden goodness.</p>
      `
    },
    {
      id: 2,
      date: 'September 15, 2025',
      title: 'Raw vs. Processed: What\'s the Difference?',
      excerpt: 'Not all honey is created equal. Learn why raw, unfiltered honey is worth seeking out and what you might be missing in store-bought varieties.',
      content: `
        <p>Walk down any grocery store aisle and you'll see dozens of honey bottles. But here's the thing: most of that honey has been heavily processed, losing much of what makes honey special in the first place.</p>
        
        <h4>What is Raw Honey?</h4>
        <p>Raw honey is exactly what it sounds like—honey straight from the hive with minimal processing. We only strain out beeswax and bee parts, leaving all the good stuff intact: pollen, enzymes, antioxidants, and natural flavors.</p>
        
        <h4>The Processing Problem</h4>
        <p>Commercial honey is often heated to high temperatures (above 160°F) to make it easier to filter and bottle. This destroys beneficial enzymes, reduces antioxidant content, and eliminates the subtle flavor notes that make each honey unique.</p>
        
        <h4>Ultra-Filtration</h4>
        <p>Many producers ultra-filter their honey to remove all pollen and create a crystal-clear product. But pollen is what gives honey its distinctive character and health benefits! Plus, removing pollen makes it impossible to trace the honey's origin.</p>
        
        <h4>Why We Keep It Raw</h4>
        <p>At Irek's Apiary, we never heat our honey above 95°F (hive temperature). We never ultra-filter. What you get is honey as nature intended—thick, flavorful, and full of beneficial compounds. It might crystallize over time, but that's actually a sign of quality!</p>
        
        <p>Choose raw. Choose real. Choose honey that actually tastes like something.</p>
      `
    },
    {
      id: 3,
      date: 'September 1, 2025',
      title: 'Seasonal Honey: A Taste of Time',
      excerpt: 'Each season brings different flowers, and each flower brings unique flavors. Explore how our honey changes throughout the year.',
      content: `
        <p>Unlike most food products, honey is a true expression of time and place. The flavor, color, and aroma of honey depend entirely on which flowers were blooming when the bees were foraging.</p>
        
        <h4>Spring Honey</h4>
        <p>Spring brings fruit tree blossoms and early wildflowers. Spring honey tends to be lighter in color and more delicate in flavor, with fruity and floral notes. It's perfect for drizzling over yogurt or fresh fruit.</p>
        
        <h4>Summer Honey</h4>
        <p>This is peak wildflower season! Summer honey is typically darker, more robust, and packed with complex flavors. Our Wildflower honey comes from this abundant season when hundreds of flower species are in bloom.</p>
        
        <h4>Fall Honey</h4>
        <p>Late-season flowers like asters and goldenrod produce honey with deeper, almost molasses-like notes. Fall honey is richer and more intense—perfect for baking and cooking.</p>
        
        <h4>Why This Matters</h4>
        <p>When you buy honey from a single source and season, you're getting a snapshot of that specific time and place. It's terroir, but for honey. Each batch tells the story of that season's blooms.</p>
        
        <p>Commercial blended honey tastes the same year-round because it mixes honey from multiple sources and seasons. We embrace the natural variation—it's what makes honey interesting!</p>
      `
    },
    {
      id: 4,
      date: 'August 20, 2025',
      title: 'Sustainable Beekeeping Practices',
      excerpt: 'How we maintain healthy colonies while harvesting responsibly. A look at the ethical considerations behind every jar.',
      content: `
        <p>At Irek's Apiary, we believe that healthy bees make the best honey. Our beekeeping practices prioritize colony wellbeing above all else—because what's good for the bees is good for everyone.</p>
        
        <h4>Leaving Enough for the Bees</h4>
        <p>We never take all the honey from a hive. Bees need their honey stores to survive, especially during winter. We only harvest surplus honey, ensuring each colony has plenty for themselves.</p>
        
        <h4>Chemical-Free Approach</h4>
        <p>We manage pests and diseases without synthetic chemicals. Instead, we use integrated pest management, strong genetics, and proper hive maintenance to keep our colonies healthy naturally.</p>
        
        <h4>Habitat Preservation</h4>
        <p>Bees need diverse, pesticide-free forage. We work with local landowners to preserve wildflower habitats and avoid areas with intensive pesticide use. Every jar of our honey represents acres of protected wildflowers.</p>
        
        <h4>Ethical Harvesting</h4>
        <p>We harvest honey at the right times, in the right amounts, with minimal stress to the bees. Our methods ensure that beekeeping remains sustainable for generations to come.</p>
        
        <p>When you choose Irek's Apiary, you're supporting beekeeping that puts bees first. Because in the end, happy bees mean better honey—and a healthier planet.</p>
      `
    }
  ];

  const togglePost = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <PageContainer>
      <AnnouncementBar message="📚 NEW POST: THE SECRET LIFE OF HONEY BEES" />
      <SharedHeader />

      <Content>
        <Title>The Buzz: Our Blog</Title>

        <BlogGrid>
          {blogPosts.map((post) => (
            <BlogPost key={post.id}>
              <PostDate>{post.date}</PostDate>
              <PostTitle>{post.title}</PostTitle>
              <PostExcerpt>{post.excerpt}</PostExcerpt>
              
              {expandedPost === post.id && (
                <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
              
              {expandedPost !== post.id ? (
                <ReadMore onClick={() => togglePost(post.id)}>
                  Read Full Article →
                </ReadMore>
              ) : (
                <CollapseButton onClick={() => togglePost(post.id)}>
                  ← Show Less
                </CollapseButton>
              )}
            </BlogPost>
          ))}
        </BlogGrid>
      </Content>

      <NewsletterFooter />
      <Footer />
    </PageContainer>
  );
}

export default Blog;
