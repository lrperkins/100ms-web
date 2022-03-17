// @ts-check
import React, { useContext, useState } from "react";
import {
  Avatar,
  StyledVideoTile,
  Video,
  VideoTileStats,
  useBorderAudioLevel,
} from "@100mslive/react-ui";
import {
  useHMSStore,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
  selectPeerByID,
  selectPeerMetadata,
  selectVideoTrackByPeerID,
} from "@100mslive/react-sdk";
import {
  MicOffIcon,
  HandRaiseFilledIcon,
  BrbIcon,
} from "@100mslive/react-icons";
import TileMenu from "./TileMenu";
import { getVideoTileLabel } from "./peerTileUtils";
import { ConnectionIndicator } from "./Connection/ConnectionIndicator";

const Tile = ({ peerId, showStatsOnTiles, isAudioOnly,  width, height }) => {
  const track = useHMSStore(selectVideoTrackByPeerID(peerId));
  const peer = useHMSStore(selectPeerByID(peerId));
  const isAudioMuted = !useHMSStore(selectIsPeerAudioEnabled(peerId));
  const isVideoMuted = !useHMSStore(selectIsPeerVideoEnabled(peerId));
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const metaData = useHMSStore(selectPeerMetadata(peerId));
  const borderAudioRef = useBorderAudioLevel(peer?.audioTrack);
  const isVideoDegraded = track?.degraded;
  const isHandRaised = metaData?.isHandRaised || false;
  const isBRB = metaData?.isBRBOn || false;
  const label = getVideoTileLabel(peer, track);
  return (
    <StyledVideoTile.Root css={{ width, height }}>
      {peer ? (
        <StyledVideoTile.Container
          onMouseEnter={() => setIsMouseHovered(true)}
          onMouseLeave={() => {
            setIsMouseHovered(false);
          }}
          ref={borderAudioRef}
        >
          <ConnectionIndicator isTile peerId={peerId} />
          {showStatsOnTiles ? (
            <VideoTileStats
              audioTrackID={peer?.audioTrack}
              videoTrackID={peer?.videoTrack}
              peerID={peer?.id}
            />
          ) : null}

          {track ? (
            <Video
              trackId={track?.id}
              attach={!isAudioOnly}
              mirror={peer?.isLocal && track?.source === "regular"}
              degraded={isVideoDegraded}
            />
          ) : null}
          {isVideoMuted || isVideoDegraded || isAudioOnly ? (
            <Avatar name={peer?.name || ""} />
          ) : null}
          <StyledVideoTile.Info>{label}</StyledVideoTile.Info>
          {isAudioMuted ? (
            <StyledVideoTile.AudioIndicator>
              <MicOffIcon />
            </StyledVideoTile.AudioIndicator>
          ) : null}
          {isMouseHovered && !peer?.isLocal ? (
            <TileMenu
              peerID={peer?.id}
              audioTrackID={peer?.audioTrack}
              videoTrackID={peer?.videoTrack}
            />
          ) : null}
          {isHandRaised ? (
            <StyledVideoTile.AttributeBox css={metaStyles}>
              <HandRaiseFilledIcon width={40} height={40} />
            </StyledVideoTile.AttributeBox>
          ) : null}
          {isBRB ? (
            <StyledVideoTile.AttributeBox css={metaStyles}>
              <BrbIcon width={40} height={40} />
            </StyledVideoTile.AttributeBox>
          ) : null}
        </StyledVideoTile.Container>
      ) : null}
    </StyledVideoTile.Root>
  );
};

const metaStyles = { left: "20px", bottom: "20px" };

const VideoTile = React.memo(Tile);

export default VideoTile;
