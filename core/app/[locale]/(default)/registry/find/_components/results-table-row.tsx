import Image from 'next/image';
import React from 'react';

import Avatar from './avatar.svg';

interface Props {
  registry: {
    title: string;
    name: string;
    partnerName?: string;
    date?: string;
    avatar?: string;
    country?: string;
    location: string;
  };
}

export default function ResultsTableRow({ registry }: Props) {
  const { name, location, title, date } = registry;

  return (
    <tr data-test="results-table-row" className="bg-white odd:bg-gray-100 hover:bg-black/5">
      <td className="grid-cols-avatar grid grid-rows-2 p-2">
        <Image
          alt="Avatar"
          className="row-span-2 w-9 rounded-full border border-turq p-1"
          height={36}
          src={Avatar}
          width={36}
        />
        <span className="min-h-12 text-base" title={title}>
          {title}
        </span>
        <small>{name}</small>
      </td>
      <td className="p-2">
        <span>{location}</span>
      </td>
      <td className="p-2">
        <time dateTime={date}>{date}</time>
      </td>
    </tr>
  );
}
