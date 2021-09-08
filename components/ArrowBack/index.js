import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";

const ArrowBack = () => {
  const router = useRouter();

  return (
    <div className="arrow-back">
      <Icon name="arrow left" link onClick={() => router.back()} />
    </div>
  );
};

export default ArrowBack;
