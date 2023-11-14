import { memo, useState } from "react";
import { productInfoTabs } from "~/utils/constants";

const ProductInformation = () => {
  const [activedTab, setActivedTab] = useState(1);

  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            className={`py-2 px-4 cursor-pointer 
              ${activedTab === +el.id
                ? "bg-white border border-b-0"
                : "bg-gray-200 hover:bg-white hover:border hover:border-b-0"
              }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">
        {productInfoTabs.some((el) => el.id === activedTab) && (
          <div
            className="prose max-w-3xl"
            dangerouslySetInnerHTML={{
              __html: productInfoTabs.find((el) => el.id === activedTab).content,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
