import React from "react";
import { Box, Flex, Text, useTheme } from "@100mslive/react-ui";
import { CREATE_ROOM_DOC_URL } from "../common/constants";

function ErrorPage({ error }) {
  const themeType = useTheme().themeType;
  return (
    <Flex
      align="center"
      justify="center"
      css={{
        size: "100%",
        color: "$textPrimary",
        backgroundColor: "$bgPrimary",
      }}
    >
      <Box css={{ position: "relative", overflow: "hidden", r: "$3" }}>
        <img
          src="https://teamvivo.com/wp-content/uploads/2021/05/VIVO_APRIL221-622-web-edited.jpg"
          alt="Error Background"
        />
        {window.location.hostname === "localhost" ? (
          <Flex
            align="center"
            direction="column"
            css={{ position: "absolute", top: "33.33%", left: 100 }}
          >
            <div css={{ }}>
            <Text variant="h3" css={{ color: 'white', maxWidth: 500, textAlign: 'center', textShadow: '3px 2px 4px rgb(0 0 0 / 50%)' }}>Vivo Fitness App</Text>
            <Text
              variant="body1"
              css={{ margin: "1.75rem", textAlign: "center", color: 'white', maxWidth: 500, margin: '0 auto', textShadow: '3px 2px 4px rgb(0 0 0 / 50%)', fontWeight: 'bold', fontSize: 22  }}
            >
              {
                "Hi there! The Vivo team is working on an an upgraded experience for our users. Follow the specific meeting link to access your workout. "
              }
            </Text></div>
          </Flex>
        ) : (
          <Flex
            align="center"
            direction="column"
            css={{ position: "absolute", size: "100%", top: "33.33%", left: 0 }}
          >
            <Text variant="h2">404</Text>
            <Text variant="h4" css={{ mt: "1.75rem" }}>
              {error}
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

ErrorPage.displayName = "ErrorPage";

export default ErrorPage;
