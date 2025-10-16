import { useIsMounted } from "@sarcoinswap/hooks";
import throttle from "lodash/throttle";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AtomBox } from "../../components/AtomBox";
import { BottomNav } from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import CakePrice from "../../components/CakePrice/CakePrice";
import Footer from "../../components/Footer";
import LangSelector from "../../components/LangSelector/LangSelector";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useMatchBreakpoints } from "../../contexts";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { MenuContext } from "./context";
import { BodyWrapper, FixedContainer, Inner, StyledNav, TopBannerContainer, Wrapper } from "./styled";
import { NavProps } from "./types";

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  homeLink: homeLink_,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  activeSubItemChildItem,
  showCakePrice = true,
  showLangSelector = true,
  langs,
  buyCakeLabel,
  buyCakeLink,
  children,
  chainId,
  logoComponent,
}) => {
  const { isMobile } = useMatchBreakpoints();
  const isMounted = useIsMounted();
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.scrollY);

  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMounted && banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.scrollY;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = useMemo(() => links.find((link) => link.label === "Home"), [links]);

  const subLinksWithoutMobile = useMemo(() => subLinks?.filter((subLink) => !subLink.isMobileOnly), [subLinks]);
  const subLinksMobileOnly = useMemo(() => subLinks?.filter((subLink) => subLink.isMobileOnly), [subLinks]);

  const providerValue = useMemo(
    () => ({
      linkComponent,
      totalTopMenuHeight,
    }),
    [linkComponent, totalTopMenuHeight]
  );

  return (
    <MenuContext.Provider value={providerValue}>
      <AtomBox
        asChild
        minHeight={{
          xs: "auto",
          md: "100vh",
        }}
      >
        <Wrapper>
          <FixedContainer showMenu={showMenu} $height={totalTopMenuHeight}>
            {banner && isMounted && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
            <StyledNav id="nav">
              <Flex>
                {logoComponent ?? <Logo href={homeLink_ ?? homeLink?.href ?? "/home"} />}
                <AtomBox display={{ xs: "none", lg: "block" }}>
                  <MenuItems
                    ml="24px"
                    items={links}
                    activeItem={activeItem}
                    activeSubItem={activeSubItem}
                    activeSubItemChildItem={activeSubItemChildItem}
                  />
                </AtomBox>
              </Flex>
              <Flex alignItems="center" height="100%">
                <AtomBox mr="12px" display={{ xs: "none", xxl: "block" }}>
                  <CakePrice chainId={chainId} showSkeleton={false} cakePriceUsd={cakePriceUsd} />
                </AtomBox>
                {showLangSelector && (
                  <Box mt="4px">
                    <LangSelector
                      currentLang={currentLang}
                      langs={langs}
                      setLang={setLang}
                      buttonScale="xs"
                      color="textSubtle"
                      hideLanguage
                    />
                  </Box>
                )}
                {rightSide}
              </Flex>
            </StyledNav>
          </FixedContainer>
          {subLinks ? (
            <Flex justifyContent="space-around" overflow="hidden">
              <SubMenuItems
                items={subLinksWithoutMobile}
                mt={`${totalTopMenuHeight + 1}px`}
                activeItem={activeSubItemChildItem || activeSubItem}
              />

              {subLinksMobileOnly && subLinksMobileOnly?.length > 0 && (
                <SubMenuItems
                  items={subLinksMobileOnly}
                  mt={`${totalTopMenuHeight + 1}px`}
                  activeItem={activeSubItemChildItem || activeSubItem}
                  isMobileOnly
                />
              )}
            </Flex>
          ) : (
            <div />
          )}
          <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight + 1}px` : "0"}>
            <Inner>{children}</Inner>
          </BodyWrapper>
        </Wrapper>
      </AtomBox>
      <Footer
        chainId={chainId}
        items={footerLinks}
        isDark={isDark}
        toggleTheme={toggleTheme}
        langs={langs}
        setLang={setLang}
        currentLang={currentLang}
        cakePriceUsd={cakePriceUsd}
        buyCakeLabel={buyCakeLabel}
        buyCakeLink={buyCakeLink}
        showLangSelector={showLangSelector}
        showCakePrice={showCakePrice}
        mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
      />
      <AtomBox display={{ xs: "block", lg: "none" }}>
        <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
      </AtomBox>
    </MenuContext.Provider>
  );
};

export default Menu;
