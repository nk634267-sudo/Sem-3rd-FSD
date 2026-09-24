 import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'dist');

// Create required folders automatically
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(path.join(root, 'src'), { recursive: true });

const E = s =>
    String(s ?? '').replace(
        /[&<>"']/g,
        c => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[c])
    );

const email = 'velsaira.com@gmail.com';

const categories = [
    ['rings', 'Rings', 'rings'],
    ['earrings', 'Earrings', 'studio'],
    ['pendants', 'Pendants', 'atelier'],
    ['necklaces', 'Necklaces', 'atelier'],
    ['bracelets', 'Bracelets', 'bracelet'],
    ['bangles', 'Bangles', 'bangle'],
    ['sets', 'Jewellery sets', 'set'],
    ['real-flower-jewellery', 'Real flowers', 'craft'],
    ['personalized', 'Personalized', 'rings'],
    ['bridal', 'Bridal & wedding', 'set'],
    ['flower-preservation', 'Flower preservation', 'craft'],
    ['gifts', 'Gifts', 'packaging'],
    ['accessories', 'Accessories', 'packaging']
];

const products = [
    {
        id: 'cosmos-pendant',
        name: 'The Cosmos Pendant',
        collection: 'Premium',
        category: 'pendants',
        image: 'atelier',
        flower: 'Cosmos',
        colour: 'Burgundy',
        tags: [
            'necklaces',
            'real-flower-jewellery',
            'personalized',
            'flower-preservation',
            'gifts'
        ],
        story:
            'A softly irregular, clear resin form frames deep burgundy petals and fine botanical stems. The transparent space around the flower becomes part of the composition.',
        style: 'Statement',
        design:
            'Clear resin, preserved floral composition, silver-tone chain concept'
    },

    {
        id: 'daisy-studs',
        name: 'The Daisy Studs',
        collection: 'Everyday',
        category: 'earrings',
        image: 'studio',
        flower: 'Daisy',
        colour: 'White',
        tags: [
            'real-flower-jewellery',
            'gifts'
        ],
        story:
            'Tiny white daisies and delicate green leaves sit within simple clear resin shapes. An airy botanical composition for everyday moments.',
        style: 'Minimal',
        design:
            'Clear resin, white botanical inclusions, stud-finding concept'
    },

    {
        id: 'petal-ring',
        name: 'The Petal Ring',
        collection: 'Everyday',
        category: 'rings',
        image: 'rings',
        flower: 'Petals',
        colour: 'Pink',
        tags: [
            'real-flower-jewellery',
            'personalized',
            'gifts'
        ],
        story:
            'Soft pink petals held inside a clear sculptural ring. A small botanical detail, seen differently from every angle.',
        style: 'Minimal',
        design:
            'Clear resin with a pink pressed-petal composition'
    },

    {
        id: 'fern-bracelet',
        name: 'The Fern Bracelet',
        collection: 'Everyday',
        category: 'bracelets',
        image: 'bracelet',
        flower: 'Fern',
        colour: 'Green',
        tags: [
            'real-flower-jewellery',
            'personalized',
            'gifts'
        ],
        story:
            'A delicate fern composition in a clear resin charm, paired with a fine chain. An understated way to keep a little green close.',
        style: 'Minimal',
        design:
            'Clear resin, fern-inspired botanical inclusion, silver-tone chain concept'
    },

    {
        id: 'meadow-bangle',
        name: 'The Meadow Bangle',
        collection: 'Premium',
        category: 'bangles',
        image: 'bangle',
        flower: 'Wildflowers',
        colour: 'White',
        tags: [
            'real-flower-jewellery',
            'personalized',
            'flower-preservation',
            'gifts'
        ],
        story:
            'A small meadow suspended in a polished, transparent bangle. Fine white flowers and leaves form an airy composition around the wrist.',
        style: 'Statement',
        design:
            'Clear resin with white dried-flower and leaf composition'
    },

    {
        id: 'botanical-duet',
        name: 'The Botanical Duet',
        collection: 'Premium',
        category: 'sets',
        image: 'set',
        flower: 'Wildflowers',
        colour: 'Mauve',
        tags: [
            'necklaces',
            'earrings',
            'bridal',
            'real-flower-jewellery',
            'personalized',
            'flower-preservation',
            'gifts'
        ],
        story:
            'A necklace and earrings imagined as one botanical composition. Dusty mauve florals and refined transparent forms create a considered set.',
        style: 'Statement',
        design:
            'Clear resin, mauve floral composition, silver-tone finding concept'
    }
];

/*
 * PRICE DATA
 *
 * prices.json is optional now.
 * If it exists, it will be used.
 * If it does not exist, products will show "Price coming soon".
 */

const pricesPath = path.join(root, 'prices.json');

let prices = {};

if (fs.existsSync(pricesPath)) {
    try {
        prices = JSON.parse(
            fs.readFileSync(pricesPath, 'utf8')
        );
    } catch (error) {
        console.error('Invalid prices.json file.');
        console.error(error.message);
        process.exit(1);
    }
}

// Apply prices to products
for (const p of products) {
    const v = prices[p.id];

    if (
        v !== null &&
        v !== undefined &&
        (
            typeof v !== 'number' ||
            !Number.isFinite(v) ||
            v < 0
        )
    ) {
        throw new Error('Invalid price: ' + p.id);
    }

    p.price = v ?? null;
}

const priceLabel = p =>
    p.price === null
        ? 'Price coming soon'
        : new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR'
          }).format(p.price);

const img = (
    key,
    alt,
    cls = '',
    eager = false
) => `
<img
    class="${cls}"
    src="/assets/${key}-1280.webp"
    srcset="/assets/${key}-640.webp 640w, /assets/${key}-1280.webp 1280w"
    sizes="(max-width:680px) 100vw, (max-width:1000px) 50vw, 33vw"
    width="1280"
    height="1600"
    ${
        eager
            ? 'fetchpriority="high"'
            : 'loading="lazy" decoding="async"'
    }
    alt="${E(alt)}"
>
`;

const photoNote = `
<p class="photo-note">
    Illustrative design concept. Final products and specifications to be confirmed.
</p>
`;