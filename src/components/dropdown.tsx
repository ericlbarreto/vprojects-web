import { IoClose } from 'react-icons/io5';
import emailIcon from '../assets/email.svg';
import phoneIcon from '../assets/phone.svg';
import birthIcon from '../assets/birth.svg';
import locationIcon from '../assets/location.svg';
import jobIcon from '../assets/job.svg';
import { DropdownProps } from '@/interfaces/DropdownProps';

const Dropdown = ({ user, formattedBirthDate, closeDropdown }: DropdownProps) => {
  return (
    <div className="w-72 h-72 rounded-2xl absolute top-10 right-0">
      <div className="rounded-t-2xl bg-roxoPrincipal p-3">
        <div className="flex justify-end">
          <button onClick={closeDropdown}>
            <IoClose className="size-8 text-white" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center space-y-1">
          <div>
            <img className="rounded-full size-36 border-4 border-white" src={user?.profilePhoto} alt="User profile" />
          </div>
          <div>
            <p className="font-bold text-lg text-white">{user?.name}</p>
          </div>
          <div>
            <p className="font-light text-sm text-white">{user?.position}</p>
          </div>
          <div>
            <button className="border border-white py-1 px-4 rounded-md">
              <span className="font-semibold text-white text-xs">Editar Informações</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-2xl p-6 space-y-4">
        <div className="grid grid-cols-4 flex items-center">
          <div className="col-span-1">
            <div className="flex justify-center items-center bg-white shadow-xl w-10 h-10 rounded-full">
              <img className="h-4 w-4" src={emailIcon} alt="Ícone de e-mail" />
            </div>
          </div>
          <div className="col-span-3">
            <span className="text-[#455468]">{user?.email}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 flex items-center">
          <div className="col-span-1">
            <div className="flex justify-center items-center bg-white shadow-xl w-10 h-10 rounded-full">
              <img className="h-4 w-4" src={phoneIcon} alt="Ícone de telefone" />
            </div>
          </div>
          <div className="col-span-3">
            <span className="text-[#455468]">{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 flex items-center">
          <div className="col-span-1">
            <div className="flex justify-center items-center bg-white shadow-xl w-10 h-10 rounded-full">
              <img className="h-4 w-4" src={birthIcon} alt="Ícone de presente" />
            </div>
          </div>
          <div className="col-span-3">
            <span className="text-[#455468]">{formattedBirthDate}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 flex items-center">
          <div className="col-span-1">
            <div className="flex justify-center items-center bg-white shadow-xl w-10 h-10 rounded-full">
              <img className="h-4 w-4" src={locationIcon} alt="Ícone de localização" />
            </div>
          </div>
          <div className="col-span-3">
            <span className="text-[#455468] block">{user?.address.street}, {user?.address.number}</span>
            <span className="text-[#455468] block">{user?.address.city}, {user?.address.state}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 flex items-center">
          <div className="col-span-1">
            <div className="flex justify-center items-center bg-white shadow-xl w-10 h-10 rounded-full">
              <img className="h-4 w-4" src={jobIcon} alt="Ícone de trabalho" />
            </div>
          </div>
          <div className="col-span-3">
            <span className="text-[#455468] block">Setor: {user?.sector}</span>
            <span className="text-[#455468] block">Cargo: {user?.position}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
