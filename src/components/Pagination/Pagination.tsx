import React, {FC, useEffect, useState} from 'react';
import './Pagination.scss';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import classNames from "classnames";


interface PaginationProps {
  pageCount: number;
  currentPage: number;
}

type ButtonsType = number | string;

const Pagination: FC<PaginationProps> = ({pageCount, currentPage}) => {
  const [activeButton, setActiveButton] = useState<number>(currentPage);
  const [visibleButtons, setVisibleButtons] = useState<ButtonsType []>([]);
  const paginationDigits: number[] = Array.from({length: pageCount}, (_, index) => index + 1);
  const dotsInitial = '...'
  const dotsLeft = '... '
  const dotsRight = ' ...'

  function activeButtonHandler(button: ButtonsType) {
    if (typeof button === "string") {
      if (button === dotsInitial) {
        setActiveButton(+visibleButtons[visibleButtons.length - 3] + 1)
      } else if (button === dotsRight) {
        setActiveButton(+visibleButtons[3] + 2)
      } else if (button === dotsLeft) {
        setActiveButton(+visibleButtons[3] - 2)
      }
    } else {
      setActiveButton(button)
    }
  }

  useEffect(() => {
    let tempVisibleButtons = [...visibleButtons]

    if (paginationDigits.length < 6) {
      setVisibleButtons(paginationDigits)
    }

    if (paginationDigits.length > 6) {
      if (activeButton >= 1 && activeButton <= 3) {
        const sliced = paginationDigits.slice(0, 4)
        tempVisibleButtons = [...sliced, dotsInitial, paginationDigits.length]
      } else if (activeButton === 4) {
        const sliced = paginationDigits.slice(0, 5)
        tempVisibleButtons = [...sliced, dotsInitial, paginationDigits.length]
      } else if (activeButton > 4 && activeButton < paginationDigits.length - 2) {
        const sliced1 = paginationDigits.slice(activeButton - 2, activeButton)
        const sliced2 = paginationDigits.slice(activeButton, activeButton + 1)
        tempVisibleButtons = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, paginationDigits.length])
      } else if (activeButton > paginationDigits.length - 3) {
        const sliced = paginationDigits.slice(paginationDigits.length - 4)
        tempVisibleButtons = ([1, dotsLeft, ...sliced])
      }

      setVisibleButtons(tempVisibleButtons)
    }

  }, [activeButton])

  useEffect(() => {
    setActiveButton(currentPage);
  }, [currentPage])

  return (
      <div className="pagination flex w-full md:w-max md:gap-[55px] h-[52px] px-[10px] bg-[#FFFFFF] rounded-lg ">
        <a
            href={`#/${activeButton}`}
            className="pagination__left-arrow flex grow my-[10px] border-r-2 md:pr-[27px]"
            onClick={() => setActiveButton((prev) => prev <= 1 ? prev : prev - 1)}
        >
          <img src={arrowLeft} alt="arrow" className="pagination__arrow-img"/>
        </a>

        <div className="pagination__pages flex items-center gap-[18px]">
          {visibleButtons.map(((item, index) => {
            return <a
                href={`#/${activeButton}`}
                key={index}
                className={classNames(
                    "w-[31px] flex items-center justify-center h-full hover:text-[#5876C5] border-[#5876C5] ease-in duration-200",
                    {
                      'text-[#5876C5] border-b-2': activeButton === item,
                    },
                )}
                onClick={() => activeButtonHandler(item)}
            >
              {item}
            </a>
          }))}
        </div>

        <a
            href={`#/${activeButton}`}
            className="pagination__right-arrow flex justify-end grow my-[10px] border-l-2 md:pl-[27px]"
            onClick={() => setActiveButton((prev) => prev >= pageCount ? prev : prev + 1)}
        >
          <img src={arrowRight} alt="arrow" className="pagination__arrow-img"/>
        </a>
      </div>
  );
}

export default Pagination;
