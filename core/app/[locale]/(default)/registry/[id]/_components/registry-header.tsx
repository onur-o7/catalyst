import Image from 'next/image';

import backgroundImage1 from '../_images/background/bg.jpg';
import Avatar from './avatar.svg';

export default function RegistryHeader() {
  return (
    <>
      <header className="full-width relative">
        <Image
          src={backgroundImage1}
          className="full-width absolute inset-0 h-full w-full object-cover object-center"
          alt="Background"
        />
        <div className="full-width flex content-between items-end">
          <div className="relative top-4 z-10 flex">
            <Image
              className="mb-0 ml-36 mr-12 mt-32 h-36 w-36 rounded-full border border-turq bg-white object-contain"
              alt="Event"
              src={Avatar}
            />
            <div className="info-container">
              <h4 className="text-2xl font-bold capitalize">Foithtospito</h4>
              <div className="info-date mb-5">January 01, 1970</div>
            </div>
          </div>
        </div>
      </header>
      <div className="full-width bg-primary">
        <div className="flex-sm-row flex-column me-0 flex w-full items-center">
          <div className="header-bottom-left absoulte text-center">
            <span />
          </div>
          <div className="min-h-14 w-full text-white" />
        </div>
      </div>
    </>
  );
}
