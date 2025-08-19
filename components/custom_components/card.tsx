import { Button } from '@/components/ui/button';
import { FaCheck } from 'react-icons/fa';

type CardProps = {
  title: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  buttonText: string;
};

const Card = ({ title, price, duration, description, features, buttonText }: CardProps) => {
  return (
    <div className='h-full flex flex-col justify-center items-start p-12 gap-8 hover:border-1 hover:border-header-purple rounded-xl shadow-sm'>
      <div>
        <p className='text-[16px] font-semibold text-header-purple'>{title}</p>
        <p className='text-[36px] font-bold text-header-purple'>
          {price}
          <span className='text-[14px] text-gray-subheading'>/{duration}</span>
        </p>
        <p className='text-[12px] text-gray-subheading'>{description}</p>
      </div>

      <div className='h-full flex flex-col items-start justify-start gap-2'>
        {features.map((feature, index) => (
          <div key={index} className='flex flex-row gap-2'>
            <FaCheck className='h-4 w-4 text-header-purple' />
            <p className='text-[14px] text-gray-subheading'>{feature}</p>
          </div>
        ))}
      </div>

      <div className='w-full'>
        <Button className='w-full bg-white text-header-purple hover:bg-header-purple hover:text-white text-[14px] font-medium rounded-md shadow-md shadow-header-purple hover:shadow-none mt-4 px-4 py-2'>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default Card;
