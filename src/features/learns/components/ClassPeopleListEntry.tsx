import { LearnhubUser } from "../../../types/user.ts";

interface ClassPeopleListEntryProps {
  user: LearnhubUser;
}

function ClassPeopleListEntry({ user }: ClassPeopleListEntryProps) {
  return (
    <div className="bg-white w-full p-5">
      <div className="flex items-center space-x-7">
        <img
          src={user.profilePicture}
          alt="profile picture"
          className="min-w-[55px] max-w-[55px] min-h-[55px] max-h-[55px] rounded-full bg-[#d9d9d9] object-cover"
        />
        <h2 className="text-[#606060] text-[20px] font-bold">
          {user.fullname}
        </h2>
      </div>
    </div>
  );
}

export default ClassPeopleListEntry;
