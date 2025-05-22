'use client'; 

import { ArrowRight } from 'lucide-react'; 
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import CaseStudyContentModal from './CaseStudyContent'; 

interface CaseStudyItemData {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  imageHint: string;
  summary: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  keyTakeaway?: string;
  background?: string;
  problemStatement?: string;
  actionsTaken?: {
    title: string;
    introduction?: string;
    points: Array<{ heading?: string; description: string } | string>;
  };
  results?: string;
  conclusion?: string;
  additionalSections?: Array<{
    heading: string;
    text: string | string[];
  }>;
}

const caseStudiesData: CaseStudyItemData[] = [
  {
    id: 'pmf-fitness-coaching',
    category: 'Business Strategy',
    title: 'PMF: Scaling a Fitness Coaching Business',
    imageUrl: 'https://picsum.photos/seed/fitnesscoach/800/600',
    imageHint: 'fitness coaching gym',
    summary: 'The founder of PMF, a fitness coaching company, faced challenges scaling beyond ₹40 lakhs turnover despite a solid service offering. This case study explores the strategic marketing and lead generation overhaul that tripled revenue.',
    challenge: 'The founder of PMF, a fitness coaching company, led a team of seven with an annual turnover of ₹40 lakhs and a profit of ₹13 lakhs. Offering one-on-one personal training, diet charts, and health analysis, PMF had a solid foundation but lacked a clear strategy to expand. The founder struggled with marketing the business and generating quality leads to fuel growth.',
    solution: 'PMF partnered with Consult Advizo for a three-quarter engagement. In the first quarter, the Consult Advizo team conducted in-depth market research, analyzed competitors, and identified growth opportunities. They crafted a tailored plan for the next two quarters, focusing on a B2B approach. A breakthrough came when Consult Advizo secured a meeting with the director of India’s leading hospital, enabling PMF to launch a fitness campaign targeting doctors and nurses. This initiative boosted PMF’s brand visibility and credibility.\n\nAdditionally, Consult Advizo revamped PMF’s offerings, introducing customized services for different age groups and genders. These strategic moves paid off, tripling PMF’s revenue by the third quarter. Looking ahead, Consult Advizo developed a product plan set to launch soon, positioning PMF for sustained growth.',
    outcome: 'In just three quarters, PMF transformed from a small-scale operation into a recognized fitness brand with a robust market presence. Revenue soared to 3x its previous level, driven by smart marketing, high-value B2B partnerships, and diversified services—all thanks to Consult Advizo’s expertise.',
    keyTakeaway: 'Consult Advizo empowered PMF to break through its growth ceiling by blending market insights, strategic alliances, and innovative service design, proving that targeted expansion can deliver exponential results.',
  },
  {
    id: 'shehri-clothing-brand',
    category: 'Startup Growth',
    title: 'Shehri: Launching a Clothing Brand on a Shoestring Budget',
    imageUrl: 'https://picsum.photos/seed/clothingbrand/800/600',
    imageHint: 'fashion clothing store',
    summary: "Shehri's founder aimed to launch a female clothing brand with only ₹1 lakh. Discover how innovative sourcing and event-based sales kickstarted the brand to profitability within the first quarter.",
    challenge: 'The founder of Shehri, an aspiring female clothing brand, faced a daunting challenge: launching a profitable business with just ₹1 lakh in capital. With this limited budget, purchasing sufficient raw materials, building a digital platform, or renting a physical shop seemed nearly impossible. The goal? To kickstart the business and turn a profit within the first quarter.',
    solution: 'Shehri’s founder partnered with Consult Advizo, a consultancy firm tasked with devising a smart, cost-effective strategy. The Consult Advizo team hit the ground running, conducting thorough market research. They discovered an untapped opportunity: seasoned shops, operational for over a decade, had unsold or slightly damaged inventory that could be repurposed. After negotiating with shop owners, Consult Advizo secured raw materials at a steep discount—down from ₹300 per piece to a range of ₹60–₹100 per piece. Minor fixes, costing ₹50 per piece in bulk, transformed these items into market-ready products, allowing Shehri to maximize its limited funds.\n\nTo jumpstart sales, Consult Advizo arranged for Shehri to set up a stall at a local event for ₹25,000 over three days. The result? A remarkable ₹75,000 in sales—tripling the investment and proving the model’s potential.',
    outcome: 'With Consult Advizo’s guidance, Shehri didn’t just survive its first quarter—it thrived. The initial event success provided the capital to establish a website and expand sales channels, including Amazon and Myntra. Within three quarters, Shehri evolved into a multi-channel retail brand with a strong online presence, B2B sales, and a scalable business model—all from a modest ₹1 lakh start.',
    keyTakeaway: 'Consult Advizo turned Shehri’s constraints into opportunities, leveraging resourcefulness and strategic partnerships to build a profitable clothing brand in record time.',
  },
  {
    id: 'shankar-ias-expansion',
    category: 'Market Expansion',
    title: 'Shankar IAS: Strategic Revamp of North India Expansion',
    imageUrl: 'https://picsum.photos/seed/iaseducation/800/600',
    imageHint: 'education classroom students',
    summary: 'A successful South Indian UPSC institution struggled with its North India expansion. This study details the turnaround strategy focusing on localized operations, targeted branding, and product overhaul.',
    background: 'The institution had successfully operated in South India for over a decade, known for its quality faculty and results. To capitalize on the growing UPSC aspirant base in North India, it expanded to Delhi 3 years ago. However, the North Indian UPSC coaching market is highly saturated, with cutthroat competition, price wars, and aspirants’ sensitivity to branding. Despite heavy monthly spending (₹10–₹12 lakhs) on branding and marketing, the institution struggled to convert leads into enrollments, leading to a widening gap between costs and revenue.',
    problemStatement: 'The institution struggled with high monthly expenditures (₹10–₹12 lakhs) overshadowing revenue, driven by inefficient marketing strategies and overspending on generic campaigns. In North India’s cluttered UPSC coaching market, it faced challenges standing out against established competitors. Centralized operations from the South India HQ led to a “one-size-fits-all” branding approach that failed to resonate with regional aspirants. Additionally, a weak sales pipeline—caused by unoptimized pricing, outdated courses, and an underperforming sales team—resulted in poor lead conversion, exacerbating the revenue gap.',
    actionsTaken: {
      title: 'Actions Taken by ADVIZO',
      introduction: 'ADVIZO implemented a multi-pronged strategy to address the challenges:',
      points: [
        { heading: 'Team Restructuring for Localized Operations', description: 'ADVIZO restructured teams to align with North India’s market needs. Marketing operations were decentralized from the South India HQ to enable localized campaigns. The institution hired North Indian educators to address regional aspirants’ academic needs, trained sales teams in consultative selling, and deployed an offline marketing team for grassroots activities like community engagement and partnerships with local educational hubs.' },
        { heading: 'Targeted Branding & Outreach Campaigns', description: 'Geo-targeted digital ads on YouTube, Instagram, and Google highlighted North Indian alumni success stories. Over 10 free workshops in universities showcased the institution’s expertise, offering UPSC prep tips to build credibility and position it as a thought leader.' },
        { heading: 'Offline Marketing Initiatives', description: 'Hoardings were placed in key UPSC hubs like Mukherjee Nagar. Free mock tests and bootcamps attracted aspirants, referral discounts incentivized student promotions, and free sample test papers distributed in libraries/bookstores demonstrated study material quality.' },
        { heading: 'Product & Pricing Overhaul', description: 'Foundational course fees were reduced by 10% to compete locally. Aspirants were offered flexible program choices—modular courses, test series, or mentorship-led programs—to cater to diverse budgets and needs, widening appeal without compromising revenue.' },
      ]
    },
    results: "Within 6 months of partnering with ADVIZO:\nADVIZO’s interventions led to significant outcomes: Monthly costs dropped by 50% (from ₹12L to ₹6L) through localized hiring and eliminating redundant HQ campaigns. Hyper-localized offline/digital campaigns and college partnerships drove a 40% surge in footfall, while a trained sales team and premium course adoption boosted revenue by 10%. Revised pricing and aspirant-aligned course structures further fueled a 10% enrollment increase, solidifying the institution’s competitiveness in North India’s UPSC market.",
    conclusion: "ADVIZO’s localized strategy, cost-efficient team restructuring, and aspirant-centric product redesign enabled the institution to break through North India’s cluttered UPSC coaching market. By decentralizing operations and aligning branding with regional preferences, the client achieved sustainable growth while halving costs.\n\nADVIZO’s data-driven approach transformed the institution into a cost-efficient, high-growth player in North India’s UPSC coaching sector.",
  },
  {
      id: 'the-hosteller-ops-optimization',
      category: 'Operational Excellence',
      title: 'The Hosteller: Streamlining Hospitality Operations for Scale',
      imageUrl: 'https://picsum.photos/seed/hosteller/800/600',
      imageHint: 'hospitality hotel operations',
      summary: 'The Hosteller, a growing hospitality brand, partnered with Consult Advizo to streamline its core operational and financial functions. Through targeted interventions in payments, vendor management, and cost structures, the business unlocked new efficiencies and scalability.',
      challenge: 'The Hosteller faced operational delays, inefficiencies in vendor dealings, and growing costs across its procurement and warehousing functions. Despite strong occupancy rates, the backend operations lacked the structure needed to scale sustainably and maintain profitability.',
      solution: 'Consult Advizo engaged with The Hosteller to optimize five key areas. First, payment processes were streamlined to improve efficiency, reduce delays, and strengthen cash flow. Vendor management systems were revamped with structured evaluations and renegotiated terms. The team then focused on cost optimization across logistics and procurement without affecting service quality. A bulk procurement strategy was introduced to leverage volume discounts and ensure supply consistency. Finally, warehousing and inventory tracking were enhanced to reduce overhead and improve visibility.\n\nThese integrated improvements laid a strong operational foundation for future expansion.',
      outcome: 'The Hosteller achieved significant improvements in operational efficiency, vendor reliability, and cost control. These initiatives not only improved profitability but also enabled the business to scale faster and more sustainably across locations.',
      keyTakeaway: 'Consult Advizo helped The Hosteller unlock operational potential through structured processes, data-driven procurement, and vendor strategies—proving that scalable hospitality success begins with backend excellence.', 
  },
  {
    id: 'green-vatika-real-estate',
    category: 'Real Estate Strategy',
    title: 'Green Vatika: Accelerating Real Estate Sales with Design & Marketing',
    imageUrl: 'https://picsum.photos/seed/greenvatika/800/600',
    imageHint: 'modern residential apartments real estate',
    summary: 'Green Vatika, a housing society project, collaborated with Consult Advizo to boost market appeal and fast-track sales. Through targeted marketing and modern interior design, the project achieved a sold-out status rapidly.',
    challenge: 'Green Vatika, despite being a well-located housing society, was facing slower-than-expected sales due to limited brand visibility and unremarkable apartment presentation. The developer needed a strategic push to enhance buyer interest and convert leads into bookings quickly.',
    solution: 'Consult Advizo implemented an end-to-end marketing strategy, covering digital outreach, branding, sales funnel structuring, and targeted campaigns—resulting in immediate booking traction. To enhance buyer appeal further, Consult Advizo curated contemporary and functional interior designs for the flats, making them visually appealing and market-ready.\n\nThis combination of design-driven upgrades and performance marketing played a pivotal role in positioning Green Vatika as a desirable residential project.',
    outcome: 'Green Vatika achieved full project sales in a short period, outperforming prior timelines. The marketing efforts maximized revenue potential while the new interior designs contributed to buyer satisfaction and faster decision-making.',
    keyTakeaway: 'Consult Advizo’s integrated approach—combining creative design with strategic marketing—enabled Green Vatika to stand out in a crowded real estate market and realize its sales goals swiftly.',
  },
  {
    id: 'eco-packaging-cpg',
    category: 'Sustainability',
    title: "Eco-Friendly Packaging: A CPG's Journey to Green",
    imageUrl: 'https://picsum.photos/seed/ecopackaging/800/600',
    imageHint: 'sustainable packaging products',
    summary: 'Follow a consumer packaged goods company commitment to sustainability by transitioning to 100% recyclable packaging, navigating material science, supply chain adjustments, and consumer education.',
    challenge: 'A major CPG company faced increasing pressure from consumers and regulators to reduce its environmental footprint, particularly concerning packaging waste. The challenge was to transition to sustainable packaging materials without compromising product integrity, shelf life, or significantly increasing costs.',
    solution: 'The company invested in R&D to identify and test alternative packaging materials, including recycled plastics, compostable bioplastics, and plant-based fibers. Supply chains were re-evaluated and modified to source these new materials. A phased rollout plan was implemented, starting with key product lines. Consumer education campaigns were launched to inform about the new packaging and proper disposal methods.',
    outcome: 'Within three years, 75% of the company\'s packaging was made from recyclable or renewable materials, with a goal of 100% in five years. The initiative enhanced brand reputation and consumer loyalty. Despite initial investment costs, long-term savings were projected from reduced material usage and waste management fees. The company became a recognized leader in sustainable packaging within its industry.',
    keyTakeaway: 'Transitioning to sustainable packaging requires a holistic approach involving R&D, supply chain transformation, and consumer engagement, but can lead to significant environmental benefits and enhanced brand value.',
  },
  {
    id: 'fintech-blockchain-banking',
    category: 'Finance',
    title: 'FinTech Disruption: Blockchain in Cross-Border Payments',
    imageUrl: 'https://picsum.photos/seed/blockchainfinance/800/600',
    imageHint: 'blockchain technology finance',
    summary: 'This case study examines how a FinTech innovator utilized blockchain technology to streamline cross-border payments, reducing transaction costs and settlement times for businesses.',
    challenge: 'Traditional cross-border payment systems were slow, expensive, and lacked transparency due to multiple intermediaries and complex regulatory requirements. Businesses faced high transaction fees, long settlement periods, and uncertainty about payment status.',
    solution: 'A FinTech startup developed a blockchain-based platform for cross-border payments. This platform utilized distributed ledger technology to enable direct, peer-to-peer transactions, bypassing traditional banking networks. Smart contracts were used to automate compliance checks and settlement processes. The platform offered real-time tracking and transparent fee structures.',
    outcome: 'Transaction costs were reduced by an average of 60%. Settlement times were cut from days to minutes. Businesses gained greater transparency and control over their international payments. The platform attracted a significant number of small and medium-sized enterprises (SMEs) looking for more efficient payment solutions.',
    keyTakeaway: 'Blockchain technology has the potential to significantly disrupt traditional financial systems by offering faster, cheaper, and more transparent solutions for complex processes like cross-border payments.',
  },
  {
    id: 'smart-factory-iot',
    category: 'Manufacturing',
    title: 'Smart Factories: IoT for Operational Excellence',
    imageUrl: 'https://picsum.photos/seed/smartfactory/800/600',
    imageHint: 'manufacturing robot factory',
    summary: 'A manufacturing leader implemented an IoT-driven smart factory system, achieving significant gains in production efficiency, predictive maintenance, and overall equipment effectiveness (OEE).',
    challenge: 'A large-scale manufacturing company faced challenges with operational inefficiencies, unexpected equipment downtime, and a lack of real-time visibility into its production processes. This impacted productivity, increased maintenance costs, and hindered its ability to respond quickly to changing market demands.',
    solution: 'The company deployed an Industrial Internet of Things (IIoT) solution, connecting machinery, sensors, and enterprise systems. Real-time data on equipment performance, production output, and energy consumption was collected and analyzed. Predictive maintenance algorithms were implemented to anticipate equipment failures. A centralized dashboard provided managers with a comprehensive view of factory operations.',
    outcome: 'Overall Equipment Effectiveness (OEE) improved by 25%. Unplanned downtime was reduced by 40% through predictive maintenance. Energy consumption decreased by 15%. The company gained greater agility in production planning and was able to optimize resource allocation more effectively.',
    keyTakeaway: 'Implementing IoT solutions in manufacturing can transform traditional factories into smart, data-driven operations, leading to substantial improvements in efficiency, productivity, and cost savings.',
  },
];


const CaseStudyCard: React.FC<{ item: CaseStudyItemData; isOffset: boolean; onLearnMore: (item: CaseStudyItemData) => void; }> = ({ item, isOffset, onLearnMore }) => {
  return (
    <section id='casestudy'
      className={cn(
        'group relative overflow-hidden shadow-xl flex flex-col transform transition-all duration-300 hover:shadow-primary/30 aspect-[3/4] !rounded-none', 
        // Apply vertical offset with a transform instead of margin to maintain grid spacing
        isOffset ? 'lg:translate-y-[80px]' : ''
      )}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="object-cover absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
        data-ai-hint={item.imageHint}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/80 group-hover:via-black/50 transition-opacity duration-300"></div>

      <div className="relative p-4 sm:p-5 text-white flex flex-col h-full">
        <div>
          <span className="bg-advizo-green text-advizo-lightgray text-[10px] font-semibold uppercase px-2.5 py-1">
            {item.category}
          </span>
        </div>

        <div className="flex-grow"></div> {/* Pushes title and summary to bottom */}

        <div className="transition-all duration-300 ease-in-out group-hover:-translate-y-1">
          {/* Summary and Learn More button - appears on hover */}
          <div
            className="mb-3 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[150px] transition-all duration-500 ease-in-out overflow-hidden bg-black/40 group-hover:bg-black/50 backdrop-blur-sm group-hover:backdrop-blur-md p-3"
          >
            <p className="text-xs sm:text-sm text-neutral-200 line-clamp-3 group-hover:line-clamp-[5] max-h-[100px] overflow-y-auto custom-scrollbar">
              {item.summary}
            </p>
            <Button
              variant="link"
              onClick={() => onLearnMore(item)} 
              className="mt-2 p-0 h-auto inline-flex items-center text-advizo-lightgreen hover:text-advizo-lightgreen/80 font-semibold text-xs"
            >
              Learn More <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>

          {/* Title - always visible */}
           <h3 
            className="font-bold text-white text-base md:text-lg lg:text-xl text-center leading-tight group-hover:text-advizo-gray cursor-pointer"
            onClick={() => onLearnMore(item)} 
          >
            {item.title}
          </h3>
        </div>
      </div>
      {/* Using standard style tag without jsx and global attributes */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px; /* Thin scrollbar */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* Transparent track */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3); /* Light thumb */
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5); /* Darker on hover */
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.3) transparent;
        }
      `}</style>
    </section>
  );
};

export default function CaseStudiesSection() {
  const [selectedCaseStudy, setSelectedCaseStudy] = React.useState<CaseStudyItemData | null>(null);

  const handleLearnMore = (study: CaseStudyItemData) => {
    setSelectedCaseStudy(study);
  };

  const handleCloseModal = () => {
    setSelectedCaseStudy(null);
  };
  
  return (
    <section aria-labelledby="latest-thinking-title" className="py-12 md:pt-16 md:pb-60  bg-background dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 
          id="latest-thinking-title" 
          className="text-3xl md:text-4xl font-bold mb-2 text-center text-advizo-green"
        >
          Case Studies
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Real success stories demonstrating our proven approach to MSME growth
        </p>
        {caseStudiesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4"> 
            {caseStudiesData.map((item, index) => {
              const isOffset = index % 2 === 0;
              return <CaseStudyCard key={item.id} item={item} isOffset={isOffset} onLearnMore={handleLearnMore} />;
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No case studies available at the moment.</p>
        )}
      </div>
      <CaseStudyContentModal
        isOpen={!!selectedCaseStudy}
        onClose={handleCloseModal}
        caseStudy={selectedCaseStudy}
      />
    </section>
  );
}
