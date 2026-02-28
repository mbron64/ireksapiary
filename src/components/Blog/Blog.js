import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'react-feather';
import PageWrapper from '../Layout/PageWrapper';
import SEO from '../shared/SEO';

const POSTS = [
  {
    id: 6,
    title: 'Nuc vs. Package Bees: Which Should You Buy?',
    date: 'February 2026',
    excerpt: 'Two ways to start a hive, very different results. Here\'s how to decide which is right for you.',
    body: `If you're getting bees for the first time, you'll see two options: a nucleus colony (nuc) and a package. They're not the same thing.

A package is 3 pounds of loose bees shaken into a box with a caged queen they've never met. They have no drawn comb, no brood, and no food stores. You're starting from scratch, and the colony needs weeks just to accept the queen and build up.

A nuc is an established mini-colony. Five frames of drawn comb, a laying queen the bees already know, brood in all stages, and honey and pollen stores. You transfer the frames into your hive body and the colony keeps going without skipping a beat.

For most first-time beekeepers in the Binghamton and Southern Tier area, we recommend nucs. Our climate is short, and a nuc gives you a head start the bees need to build up enough stores for winter. A package can work, but the margin for error is thinner.

The trade-off is price. Packages typically run $120 to $160, while nucs cost $185 to $250 depending on your area. But the success rate for nucs is significantly higher, especially in cooler climates like Upstate New York.`,
    links: [
      { text: 'we recommend nucs', to: '/nucs' },
    ],
    cta: { label: 'Reserve a Nuc', to: '/nucs' },
  },
  {
    id: 5,
    title: 'How to Install a Nuc: Step by Step',
    date: 'February 2026',
    excerpt: 'You picked up your nuc. Now what? A straightforward guide to getting your bees into their new home.',
    body: `You've picked up your sealed nuc box and driven it home. Here's what to do next.

Pick a time. Late afternoon or early evening is best. The foragers will be winding down, and the cooler air keeps the bees calmer.

Suit up. Full veil, gloves, long sleeves. Light your smoker and give a few gentle puffs at the nuc entrance before opening.

Open the nuc box and gently lift each frame out, keeping them in the same order. Place them in the center of your deep hive body. The brood frames should stay together in the middle, with honey and pollen frames on the outside.

Fill the remaining space with empty frames (foundation or foundationless, your call). Place the inner cover and outer cover on top.

Set up your entrance reducer to the smallest opening. The colony is small and needs help defending against robbing until they build up.

Leave them alone. Seriously. Don't open the hive for at least a week. The bees need time to orient to their new location. After a week, do a quick check to confirm the queen is laying and the bees are drawing out new comb.

Feed if needed. If there isn't a strong nectar flow going, a 1:1 sugar syrup feeder gives them a boost while they settle in.

That's it. The bees know what they're doing. Your job is to give them the space and stay out of the way.`,
    links: [
      { text: 'your sealed nuc box', to: '/nucs' },
    ],
    cta: { label: 'Reserve a Nuc', to: '/nucs' },
  },
  {
    id: 1,
    title: 'Why Bees Matter More Than You Think',
    date: 'October 2024',
    excerpt: 'Bees pollinate roughly one-third of the food we eat. Here\'s why their decline matters, and what you can do.',
    body: `Honeybees are responsible for pollinating about 80% of all flowering plants, including roughly one-third of every bite of food you eat. From almonds to blueberries, the list of crops that depend on bee pollination is staggering.

But bee populations have been declining for decades due to pesticides, habitat loss, and climate change. Colony Collapse Disorder alone has wiped out an estimated 40% of managed honeybee colonies in the US since 2006.

What can you do? Plant pollinator-friendly flowers (lavender, sunflowers, clover). Avoid pesticides in your garden. Support local beekeepers who practice sustainable methods. Every small action compounds.`,
    links: [
      { text: 'Support local beekeepers', to: '/shop' },
    ],
    cta: { label: 'Start Your Hive', to: '/nucs' },
  },
  {
    id: 2,
    title: 'Raw Honey vs. Store-Bought: What\'s Actually Different?',
    date: 'September 2024',
    excerpt: 'That bear-shaped bottle on the shelf has been ultra-filtered and pasteurized. Here\'s what that really means for your honey.',
    body: `Most commercial honey is heated to 150°F+ and ultra-filtered to make it clear and shelf-stable. The process removes pollen (which is how you trace honey's origin), destroys beneficial enzymes, and kills the natural yeasts that give raw honey its complex flavor.

Raw honey, by contrast, is simply strained to remove beeswax and large particles, then bottled. Everything else (the pollen, propolis, enzymes, and antioxidants) stays in.

This is why raw honey crystallizes over time (a sign of quality, not spoilage) and why it tastes noticeably richer and more complex than the processed stuff.`,
    links: [
      { text: 'raw honey crystallizes', to: '/shop' },
    ],
    cta: { label: 'Shop Honey', to: '/shop' },
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
    links: [
      { text: 'Our Spring harvest', to: '/products/spring' },
      { text: 'By Summer', to: '/products/summer' },
      { text: 'Fall honey', to: '/products/fall' },
    ],
    cta: { label: 'Shop Honey', to: '/shop' },
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
    links: [
      { text: 'Starting a hive', to: '/nucs' },
    ],
    cta: { label: 'Start Your Hive', to: '/nucs' },
  },
];

function renderParagraph(text, links = []) {
  if (!links.length) return text;
  const parts = [];
  let remaining = text;
  let keyIdx = 0;
  for (const { text: anchor, to } of links) {
    const idx = remaining.indexOf(anchor);
    if (idx === -1) continue;
    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push(<InlineLink key={keyIdx++} to={to}>{anchor}</InlineLink>);
    remaining = remaining.slice(idx + anchor.length);
  }
  if (remaining) parts.push(remaining);
  return parts.length > 1 ? parts : text;
}

export default function Blog() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(prev => (prev === id ? null : id));

  return (
    <PageWrapper>
      <SEO
        title="Beekeeping Blog | Honey Tips & Bee News"
        description="Learn about raw honey, beekeeping, and why bees matter. Tips, recipes, and stories from our apiary in Vestal, NY."
        path="/blog"
      />
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
            <PostBodyWrap $open={expanded === post.id} aria-hidden={expanded !== post.id}>
              <PostBody>
                {post.body.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{renderParagraph(paragraph, post.links)}</p>
                ))}
                {post.cta && (
                  <PostCTA to={post.cta.to}>{post.cta.label}</PostCTA>
                )}
              </PostBody>
            </PostBodyWrap>
          </Post>
        ))}
      </PostList>

      <BlogCTA>
        <CTALabel>Ready to start?</CTALabel>
        <CTAHeadline>Spring 2026 nucs are available for reservation.</CTAHeadline>
        <CTAButton to="/nucs">Reserve a Nuc</CTAButton>
      </BlogCTA>
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

const PostBodyWrap = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '2000px' : '0')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: max-height 0.4s ease, opacity 0.3s ease;
`;

const PostBody = styled.div`
  padding: 0 0 ${({ theme }) => theme.space.xl};
  max-width: 620px;

  p {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.7;
    margin-bottom: ${({ theme }) => theme.space.md};
    opacity: 0.85;
  }
`;

const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gold};
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.7; }
`;

const PostCTA = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.85; }
`;

const BlogCTA = styled.section`
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space['4xl']};
`;

const CTALabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const CTAHeadline = styled.h2`
  font-size: clamp(1.5rem, 3vw, ${({ theme }) => theme.fontSizes['2xl']});
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space['2xl']};
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.cream};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: opacity ${({ theme }) => theme.transitions.fast};
  &:hover { opacity: 0.85; }
`;
