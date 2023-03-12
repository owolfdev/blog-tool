import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function test() {
  const router = useRouter();

  useEffect(() => {
    console.log("router", router);
    const { idfortest } = router.query;

    console.log("id for test", idfortest);
  }, [router]);

  return <div>test</div>;
}

export default test;
