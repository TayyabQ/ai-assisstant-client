import Card from '@/components/custom_components/card';

const Subscriptions = () => {
  return (
    <div className='py-20 px-10 flex flex-col items-center justify-center'>
      <div className='py-8'>
        <h1 className='text-[48px] font-bold text-header-purple pb-10 lg:pb-0'>
          Pay only for what you use
        </h1>
        <p className='text-[20px] text-gray-subheading'>
          Transparent, usage-based pricing that scales with your work.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 justify-center items-center lg:gap-8 gap-16 px-4 py-8'>
        <Card
          title='Basic'
          price='$0.00'
          duration='yr'
          description='Free for Learning and Daily Usage'
          features={[
            'Unlimited Prompts & Responses',
            'No Chat Saving',
            'Community Support',
          ]}
          buttonText='Get Started'
        />

        <Card
          title='Enterprise'
          price='$100.50'
          duration='yr'
          description='Best for Large and Complex Projects'
          features={[
            'Unlimited Prompts & Responses',
            'Unlimited Chat Saving',
            'Community Support',
          ]}
          buttonText='Get Started'
        />
      </div>
    </div>
  );
};

export default Subscriptions;
