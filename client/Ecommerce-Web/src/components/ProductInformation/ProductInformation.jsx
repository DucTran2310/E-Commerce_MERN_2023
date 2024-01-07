import { Button } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductRating } from "~/components";
import { productInfoTabs } from "~/utils/constants";
import Votebar from "../Votebar/Votebar";
import { setShowModal } from "~/reducers/appReducer";
import VoteOption from "../VoteOption/VoteOption";

const ProductInformation = ({ totalRatings, totalCount, nameProduct }) => {

  const dispatch = useDispatch()

  const [activedTab, setActivedTab] = useState(1)

  const toggleVote = () => {
    dispatch(setShowModal({isShowModal: true, modalChildren: <VoteOption nameProduct={nameProduct}/>}))
  }

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
        <div
          className={`py-2 px-4 cursor-pointer
           ${activedTab === 5
              ? "bg-white border border-b-0"
              : "bg-gray-200 hover:bg-white hover:border hover:border-b-0"
            }`}
          onClick={() => setActivedTab(5)}
        >
          CUSTOMER REVIEW
        </div>
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
        {
          activedTab === 5 &&
          <div className="p-4">
            <div className="flex">
              <div className="flex-4 border flex flex-col items-center justify-center border-red-500">
                <span className="font-semibold text-3xl">{`${totalRatings}/5`}</span>
                <span className="flex items-center gap-1">
                  <ProductRating rating={totalRatings} size={'small'} />
                </span>
                <span>{`${totalCount} reviewers and commentors`}</span>
              </div>
              <div className="flex-6 border flex gap-2 flex-col p-4">
                {
                  Array.from(Array(5).keys()).reverse().map(el => (
                    <Votebar
                      key={el}
                      number={el + 1}
                      ratingTotal={5}
                      ratingCount={2}
                    />
                  ))
                }
              </div>
            </div>
            <div className="p-4 flex items-center justify-center text-sm flex-col gap-2">
              <span>Do you review this product?</span>
              <Button onClick={() => toggleVote()} variant="contained">Vote now!</Button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default memo(ProductInformation);
