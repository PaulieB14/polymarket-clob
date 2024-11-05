// Sample data - replace this with actual data from your API response if you have it
const marketData = {
    question: 'Will Caroline Ellison be federally charged by March 31?',
    description: 'This market will resolve to "Yes" if Caroline Ellison is indicted...',
    market_slug: 'will-caroline-ellison-be-federally-charged-by-march-31',
    end_date_iso: '2023-03-31T00:00:00Z',
    icon: 'https://polymarket-upload.s3.us-east-2.amazonaws.com/caroline.png'
  };
  
  // Print each key detail to the console
  console.log("Question:", marketData.question);
  console.log("Description:", marketData.description);
  console.log("Market Slug:", marketData.market_slug);
  console.log("End Date:", marketData.end_date_iso);
  console.log("Icon URL:", marketData.icon);
  
  // Format the end date to be more readable
  const endDate = new Date(marketData.end_date_iso);
  console.log("Formatted End Date:", endDate.toDateString());
  