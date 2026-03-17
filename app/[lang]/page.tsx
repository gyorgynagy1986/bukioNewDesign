import React from "react";
import Hero from "@/components/public/layout/hero";
import LogoBannerWithImages from "@/components/public/ui/banner";
import Block from '@/components/public/layout/block'
import Block2 from '@/components/public/layout/block2'
import Block3 from '@/components/public/layout/block3'


const page = () => {
  return (
    <div>
      <Hero />
      <LogoBannerWithImages />
      <Block />
      <Block3 />
      <Block2 />
    </div>
  );
};

export default page;
