import Subscriptions from "./subscriptions/page";
import Logout from "./logout/page";

export default function Component() {
  return (
    <>
      <div className="flex justify-end p-2">
        <Logout />
      </div>
      <Subscriptions />
    </>
  );
}
