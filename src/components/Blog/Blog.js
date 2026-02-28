import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'react-feather';
import PageWrapper from '../Layout/PageWrapper';

const POSTS = [
  {
    id: 1,
    title: 'Why Bees Matter More Than You Think',
    date: 'October 2024',
    excerpt: 'Bees pollinate roughly one-third of the food we eat. Here\'s why their decline matters, and what you can do.',
    body: `Honeybees are responsible for pollinating about 80% of all flowering plants, including roughly one-third of every bite of food you eat. From almonds to blueberries, the list of crops that depend on bee pollination is staggering.

But bee populations have been declining for decades due to pesticides, habitat loss, and climate change. Colony Collapse Disorder alone has wiped out an estimated 40% of managed honeybee colonies in the US since 2006.

What can you do? Plant pollinator-friendly flowers (lavender, sunflowers, clover). Avoid pesticides in your garden. Support local beekeepers who practice sustainable methods. Every small action compounds.`,
  },
  {
    id: 2,
    title: 'Raw Honey vs. Store-Bought: What\'s Actually Different?',
    date: 'September 2024',
    excerpt: 'That bear-shaped bottle on the shelf has been ultra-filtered and pasteurized. Here\'s what that really means for your honey.',
    body: `Most commercial honey is heated to 150°F+ and ultra-filtered to make it clear and shelf-stable. The process removes pollen (which is how you trace honey's origin), destroys beneficial enzymes, and kills the natural yeasts that give raw honey its complex flavor.

Raw honey, by contrast, is simply strained to remove beeswax and large particles, then bottled. Everything else (the pollen, propolis, enzymes, and antioxidants) stays in.

This is why raw honey crystallizes over time (a sign of quality, not spoilage) and why it tastes noticeably richer and more complex than the processed stuff.`,
  },
  {
    id: 3,
    title: 'A Guide to Seasonal Honey Varieties',
    date: 'August 2024',
    excerpt: 'Our Spring honey tastes nothing like our Fall harvest. Here\'s how the season shapes what ends up in your jar.',
    body: `Just like wine has terroir, honey has its own version. The flavor changes based on what the bees are foraging. Our Spring harvest comes from apple blossoms, cherry trees, and early wildflowers, producing a light, delicate honey with a clean finish.

By Summer, the bees are deep into goldenrod, clover, and black-eyed Susans, creating a fuller, more complex honey with warm floral notes. It's our most versatile harvest.

Fall honey is the boldest. The bees are foraging on late-season plants and the honey develops a rich, almost molasses-like depth with notes of dried fruit. It's our most sought-after harvest, and quantities are always limited.

The lesson: don't just buy "honey." Pay attention to the season, the source, and the beekeeper. The differences are real.`,
  },
  {
    id: 4,
    title: 'Backyard Beekeeping: What I Wish I\'d Known',
    date: 'July 2024',
    excerpt: 'I started with one hive in 2012. Here are the lessons that took me years to learn.',
    body: `Starting a hive is easy. Keeping one alive through winter is the hard part. Here's what I've learned over 12 years:

First, location matters enormously. Bees need morning sun, afternoon shade, and a windbreak in winter. Get this wrong and you'll lose colonies.

Second, don't harvest too much. Your first year, the bees need their honey more than you do. Leave them enough to survive the winter, at least 60 pounds in our climate.

Third, find a mentor. Books and YouTube are great, but nothing replaces having an experienced beekeeper look at your hive and say "that's not right." Local bee clubs are invaluable.

Finally, be patient. A healthy, productive colony takes time to build. Rush it and you'll set yourself back.`,
  },
];

export default function Blog() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(prev => (prev === id ? null : id));

  return (
    <PageWrapper>
      <Header>
        <Label>From the Hive</Label>
        <Title>Blog</Title>
        <Subtitle>
          Stories about bees, honey, and the craft of beekeeping.
        </Subtitle>
      </Header>

      <PostList>
        {POSTS.map(post => (
          <Post key={post.id}>
            <PostHeader onClick={() => toggle(post.id)} role="button" tabIndex={0}>
              <PostMeta>
                <PostDate>{post.date}</PostDate>
                <PostTitle>{post.title}</PostTitle>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
              </PostMeta>
              <ToggleIcon>
                {expanded === post.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </ToggleIcon>
            </PostHeader>
            {expanded === post.id && (
              <PostBody>
                {post.body.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </PostBody>
            )}
          </Post>
        ))}
      </PostList>
    </PageWrapper>
  );
}

const Header = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.space['3xl']} ${({ theme }) => theme.space.xl}
           ${({ theme }) => theme.space.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.fontSizes['4xl']});
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  opacity: 0.7;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
`;

const PostList = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['4xl']};
`;

const Post = styled.article`
  border-bottom: 1px solid ${({ theme }) => theme.colors.creamDark};
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.xl} 0;
  cursor: pointer;

  &:hover { opacity: 0.85; }
`;

const PostMeta = styled.div``;

const PostDate = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brownMedium};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const PostTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const PostExcerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  opacity: 0.65;
  line-height: 1.5;
`;

const ToggleIcon = styled.div`
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.brownMedium};
`;

const PostBody = styled.div`
  padding: 0 0 ${({ theme }) => theme.space.xl};
  max-width: 620px;

  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.7;
    margin-bottom: ${({ theme }) => theme.space.md};
    opacity: 0.85;

    &:last-child { margin-bottom: 0; }
  }
`;
