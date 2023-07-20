import React, { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    let response: string | any = router.query;
    if (response.success) {
      setSuccess(true);
    }
  }, [router.query]);

  return (
    <div className="text-2xl h-[40vh] font-medium flex flex-col items-center justify-center text-primary">
      {isSuccess ? (
        <div>
          <h1>Payment successfully🥳</h1>
          <p className="text-center text-dark">Check your mail for receipt</p>
        </div>
      ) : (
        <div>
          {" "}
          <p>Payment Failed🥺</p>
        </div>
      )}
    </div>
  );
}
