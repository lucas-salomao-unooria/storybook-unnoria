import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import {
  ActionRail,
  Avatar,
  Button,
  CameraModeStrip,
  CameraToolRail,
  Chip,
  CommentComposer,
  CommentItem,
  EmptyState,
  FeedHeader,
  HomeIndicator,
  Icon,
  ListRow,
  MediaGrid,
  MusicDisc,
  NavBar,
  PhoneFrame,
  PhotoCard,
  ProfileHeader,
  ProfileTabs,
  RecordButton,
  Scanner,
  SearchField,
  SectionLabel,
  Separator,
  SettingsRow,
  ShareAction,
  Sheet,
  SocialLogo,
  SoundHeader,
  StatusBar,
  TabBar,
  Tooltip,
  VideoMeta,
} from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
} from '../../../.storybook/components';
import {
  tikAlbumCover,
  tikAvatarCraig,
  tikAvatarJacob,
  tikAvatarKarennne,
  tikCameraModes,
  tikCameraPreview,
  tikCameraTools,
  tikComments,
  tikEditProfileRows,
  tikFeedComments,
  tikFeedFollowing,
  tikFeedForYou,
  tikPhotos,
  tikProfileStats,
  tikSettingsSections,
  tikShareActions,
  tikThumbnails,
} from '../fixtures';

const meta: Meta = {
  title: 'Tik Tooria/Telas/Telas Compostas',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/* ==========================================================================
   Andaimes de documentação — restritos a stories/, fora do pacote
   ========================================================================== */

/** Camada de vídeo em tela cheia, sob o conteúdo imersivo. */
const VideoLayer: React.FC<{ src: string }> = ({ src }) => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      background: `center/cover no-repeat url(${src})`,
    }}
  />
);

/** Camada absoluta genérica dentro de uma PhoneFrame. */
const At: React.FC<{
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  children: React.ReactNode;
}> = ({ top, bottom, left, right, children }) => (
  <div style={{ position: 'absolute', top, bottom, left, right, zIndex: 1 }}>{children}</div>
);

/** Faixa de conteúdo rolável sob o cromo de uma tela clara. */
const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
);

const TAB_ITEMS = (
  active: 'home' | 'discover' | 'inbox' | 'me',
  surface: 'chrome' | 'immersive'
) => (
  <TabBar surface={surface}>
    <TabBar.Item
      icon="homeStroke"
      activeIcon="homeSolid"
      label="Home"
      active={active === 'home'}
    />
    <TabBar.Item icon="search" label="Discover" active={active === 'discover'} />
    <TabBar.CreateButton surface={surface} />
    <TabBar.Item
      icon="messageStroke"
      activeIcon="messageSolid"
      label="Inbox"
      active={active === 'inbox'}
    />
    <TabBar.Item
      icon="accountStroke"
      activeIcon="accountSolid"
      label="Me"
      active={active === 'me'}
    />
  </TabBar>
);

/* ==========================================================================
   As telas
   ========================================================================== */

/** TikTok Home (For You) — node 4:1061 */
const HomeForYou: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="immersive" scale={scale} label="TikTok Home (For You) · 4:1061">
    <VideoLayer src={tikFeedForYou} />
    <At top={0} left={0}>
      <div style={{ width: 414 }}>
        <StatusBar surface="immersive" />
        <FeedHeader active="forYou" />
      </div>
    </At>
    <At top={433} right={7}>
      <Avatar size="sm" src={tikAvatarCraig} alt="" ring followable />
    </At>
    <At top={514} right={13}>
      <ActionRail>
        <ActionRail.Item icon="heart" label="328.7K" actionLabel="Curtir vídeo" />
        <ActionRail.Item icon="comment" label="578" actionLabel="Ver comentários" />
        <ActionRail.Item icon="shareArrow" label="Share" actionLabel="Compartilhar vídeo" />
      </ActionRail>
    </At>
    <At bottom={95} left={12}>
      <VideoMeta
        handle="@craig_love"
        caption="The most satisfying Job"
        tags="#fyp #satisfying #roadmarking"
        music="Roddy Roundicch - The Rou"
      />
    </At>
    <At bottom={95} right={8}>
      <MusicDisc spinning />
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>{TAB_ITEMS('home', 'immersive')}</div>
    </At>
  </PhoneFrame>
);

/** TikTok Home (Following) — node 4:1144 */
const HomeFollowing: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="immersive" scale={scale} label="TikTok Home (Following) · 4:1144">
    <VideoLayer src={tikFeedFollowing} />
    <At top={0} left={0}>
      <div style={{ width: 414 }}>
        <StatusBar surface="immersive" />
        <FeedHeader active="following" />
      </div>
    </At>
    <At top={433} right={7}>
      <Avatar size="sm" src={tikAvatarKarennne} alt="" ring />
    </At>
    <At top={514} right={13}>
      <ActionRail>
        <ActionRail.Item icon="heart" label="4445" actionLabel="Curtir vídeo" />
        <ActionRail.Item icon="comment" label="64" actionLabel="Ver comentários" />
        <ActionRail.Item icon="shareArrow" label="Share" actionLabel="Compartilhar vídeo" />
      </ActionRail>
    </At>
    <At bottom={95} left={12}>
      <VideoMeta
        handle="@karennne · 1-28"
        tags="#avicii #wflove"
        music="Avicii - Waiting For Love (ft."
      />
    </At>
    <At bottom={95} right={8}>
      <MusicDisc spinning />
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>{TAB_ITEMS('home', 'immersive')}</div>
    </At>
  </PhoneFrame>
);

/** TikTok Comments — node 4:957 */
const Comments: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="immersive" scale={scale} label="TikTok Comments · 4:957">
    <VideoLayer src={tikFeedComments} />
    <At top={0} left={0}>
      <div style={{ width: 414 }}>
        <StatusBar surface="immersive" />
        <FeedHeader active="forYou" />
      </div>
    </At>
    <At top={242} left={0}>
      <div style={{ width: 414 }}>
        <Sheet ariaLabel="Comentários">
          <Sheet.Header title="579 comments" showClose />
          <Sheet.Body style={{ height: 520 }}>
            {tikComments.map((comment) => (
              <CommentItem key={comment.author} {...comment} />
            ))}
          </Sheet.Body>
        </Sheet>
      </div>
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <CommentComposer />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok Share to — node 4:844 */
const ShareTo: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="immersive" scale={scale} label="TikTok Share to · 4:844">
    <VideoLayer src={tikFeedForYou} />
    <At top={0} left={0}>
      <div style={{ width: 414 }}>
        <StatusBar surface="immersive" />
        <FeedHeader active="forYou" />
      </div>
    </At>
    <At top={433} right={7}>
      <Avatar size="sm" src={tikAvatarCraig} alt="" ring followable />
    </At>
    <At top={514} right={13}>
      <ActionRail>
        <ActionRail.Item icon="heart" label="328K" actionLabel="Curtir vídeo" />
      </ActionRail>
    </At>
    <At top={587} left={0}>
      <div style={{ width: 414 }}>
        <Sheet ariaLabel="Compartilhar">
          <Sheet.Header title="Share to" />
          <Sheet.Body>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
              <ShareAction label="WhatsApp" media={<SocialLogo brand="whatsapp" />} />
              <ShareAction label="WhatsApp status" media={<SocialLogo brand="whatsapp" />} />
              <ShareAction label="Message" media={<SocialLogo brand="message" size={49} />} />
              <ShareAction label="SMS" media={<SocialLogo brand="sms" size={49} />} />
              <ShareAction label="Messenger" media={<SocialLogo brand="messenger" />} />
              <ShareAction label="Instagram" media={<SocialLogo brand="instagram" size={49} />} />
            </div>
            <div style={{ padding: '14px 0' }}>
              <Separator tone="sheet" />
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 20px' }}
            >
              {tikShareActions.map((action) => (
                <ShareAction key={action.label} label={action.label} icon={action.icon} />
              ))}
            </div>
          </Sheet.Body>
        </Sheet>
      </div>
    </At>
    <At bottom={0} left={0}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: 414,
          height: 83,
          paddingTop: 15,
          boxSizing: 'border-box',
          background: 'var(--tik-color-surface-primary)',
          boxShadow: 'var(--tik-elevation-bar-top)',
          fontFamily: 'var(--tik-font-sans)',
          fontSize: 'var(--tik-font-body-size)',
          color: 'var(--tik-color-text-primary)',
        }}
      >
        Cancel
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok User — node 4:426 */
const User: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="chrome" scale={scale} label="TikTok User · 4:426">
    <Body>
      <StatusBar surface="chrome" />
      <NavBar
        title="Jacob West"
        selectable
        leading={<Icon name="addAccount" size={22} tone="primary" />}
        trailing={<Icon name="menu" size={4} tone="primary" />}
      />
      <ProfileHeader
        handle="@jacob_w"
        avatarSrc={tikAvatarJacob}
        avatarAlt="Retrato de Jacob West"
        stats={tikProfileStats}
        bio="Tap to add bio"
        actions={
          <>
            <Button variant="outline">Edit profile</Button>
            <Icon name="bookmark" size={22} tone="primary" />
          </>
        }
      />
      <ProfileTabs
        active="grid"
        tabs={[
          { id: 'grid', icon: 'gridTabs', label: 'Publicações' },
          { id: 'liked', icon: 'heartHide', label: 'Curtidas ocultas', disabled: true },
        ]}
      />
      <MediaGrid items={tikThumbnails.map((src) => ({ src, alt: '' }))} />
    </Body>
    <At top={704} left={142}>
      <Tooltip title="Tap to create" description="a new video" />
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>{TAB_ITEMS('me', 'chrome')}</div>
    </At>
  </PhoneFrame>
);

/** TikTok Privacy and settings — node 4:251 */
const PrivacyAndSettings: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="chrome" scale={scale} label="TikTok Privacy and settings · 4:251">
    <Body>
      <StatusBar surface="chrome" />
      <NavBar title="Privacy and settings" showBack />
      {tikSettingsSections.map((section, index) => (
        <React.Fragment key={section.label}>
          {index > 0 && <Separator />}
          <SectionLabel>{section.label}</SectionLabel>
          {section.rows.map((row) => (
            <SettingsRow key={row.label} label={row.label} icon={row.icon} />
          ))}
        </React.Fragment>
      ))}
    </Body>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="chrome" />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok Edit Profile — node 4:357 */
const EditProfile: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="chrome" scale={scale} label="TikTok Edit Profile · 4:357">
    <Body>
      <StatusBar surface="chrome" />
      <NavBar title="Edit profile" showBack />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 75,
          padding: '32px 0 40px',
        }}
      >
        {(
          [
            { icon: 'camera' as const, label: 'Change photo', size: 21.5 },
            { icon: 'videoCamera' as const, label: 'Change video', size: 22 },
          ]
        ).map((item) => (
          <div key={item.label} style={{ textAlign: 'center' }}>
            <Avatar
              size="xl"
              background="var(--tik-color-scrim-strong)"
              icon={<Icon name={item.icon} size={item.size} tone="onImmersive" />}
            />
            <div
              style={{
                marginTop: 13,
                fontFamily: 'var(--tik-font-sans)',
                fontSize: 'var(--tik-font-label-size)',
                color: 'var(--tik-color-text-primary)',
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <SettingsRow label={tikEditProfileRows[0].label} value={tikEditProfileRows[0].value} />
      <SettingsRow label={tikEditProfileRows[1].label} value={tikEditProfileRows[1].value} />
      <SettingsRow label="" value="tiktok.com@jacob_w" showChevron={false} trailingIcon="clipboard" />
      <SettingsRow label={tikEditProfileRows[2].label} value={tikEditProfileRows[2].value} />
      <Separator />
      <SettingsRow label={tikEditProfileRows[3].label} value={tikEditProfileRows[3].value} />
      <SettingsRow label={tikEditProfileRows[4].label} value={tikEditProfileRows[4].value} />
    </Body>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="chrome" />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok Find Friends — node 4:195 */
const FindFriends: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="chrome" scale={scale} label="TikTok Find Friends · 4:195">
    <Body>
      <StatusBar surface="chrome" />
      <NavBar
        title="Find friends"
        showBack
        hairline={false}
        trailing={<Icon name="scanner" size={18} tone="primary" />}
      />
      <div style={{ padding: '16px 16px 0' }}>
        <SearchField />
      </div>
      <div style={{ paddingTop: 6 }}>
        <ListRow
          label="Invite friends"
          leading={
            <Avatar
              size="lg"
              background="var(--tik-color-avatar-invite)"
              icon={<Icon name="addAccountStroke" size={25} tone="onImmersive" />}
            />
          }
        />
        <ListRow
          label="Find contacts"
          leading={
            <Avatar
              size="lg"
              background="var(--tik-color-avatar-contacts)"
              icon={<Icon name="contacts" size={21} tone="onImmersive" />}
            />
          }
        />
        <ListRow label="Find Facebook friends" leading={<SocialLogo brand="facebook" size={54} />} />
      </div>
    </Body>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="chrome" />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok All activity — node 4:565 */
const AllActivity: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="chrome" scale={scale} label="TikTok All activity · 4:565">
    <Body>
      <StatusBar surface="chrome" />
      <NavBar
        title="All activity"
        selectable
        hairline={false}
        trailing={<Icon name="send" size={19.5} tone="primary" />}
      />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 155 }}>
        <EmptyState
          icon="emptyInbox"
          title="Notifications aren’t available"
          description="Notifications about your account will appear here"
        />
      </div>
    </Body>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>{TAB_ITEMS('inbox', 'chrome')}</div>
    </At>
  </PhoneFrame>
);

/** TikTok Direct Message — node 4:530 */
const DirectMessage: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="chrome" scale={scale} label="TikTok Direct Message · 4:530">
    <Body>
      <StatusBar surface="chrome" />
      <NavBar
        title="Direct messages"
        showBack
        trailing={<Icon name="plus" size={16} tone="primary" />}
      />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 210 }}>
        <EmptyState
          icon="emptyMessages"
          iconSize={61}
          title="Message your friends"
          description="Share videos or start a conversation"
        />
      </div>
    </Body>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="chrome" />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok Album — node 4:787 */
const Album: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="chrome" scale={scale} label="TikTok Album · 4:787">
    <Body>
      <StatusBar surface="chrome" />
      <SoundHeader
        title="The Round"
        artist="Roddy Roundicch"
        videoCount="1.7M videos"
        coverSrc={tikAlbumCover}
        coverAlt="Capa do álbum The Round"
        action={
          <Chip icon="bookmarkSmall" fixedWidth>
            Add to Favorites
          </Chip>
        }
      />
      <MediaGrid
        items={[...tikThumbnails, ...tikThumbnails, ...tikThumbnails].map((src) => ({
          src,
          alt: '',
        }))}
      />
    </Body>
    <At bottom={54} left={118}>
      <Button variant="floating" icon="videoCameraSolid">
        Use this sound
      </Button>
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="chrome" />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok Camera — node 4:662 */
const Camera: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="immersive" scale={scale} label="TikTok Camera · 4:662">
    <At top={38} left={0}>
      <div
        style={{
          width: 414,
          height: 756,
          overflow: 'hidden',
          background: `center/cover no-repeat url(${tikCameraPreview})`,
          borderRadius: 'var(--tik-radius-surface)',
        }}
      />
    </At>
    <At top={0} left={0}>
      <div style={{ width: 414 }}>
        <StatusBar surface="immersive" />
      </div>
    </At>
    <At top={78} left={20}>
      <Icon name="close" size={16.5} tone="onImmersive" />
    </At>
    <At top={78} left={176}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          opacity: 0.9,
          fontFamily: 'var(--tik-font-sans)',
          fontSize: 'var(--tik-font-meta-bold-size)',
          fontWeight: 'var(--tik-font-meta-bold-weight)' as unknown as number,
          color: 'var(--tik-color-text-on-immersive)',
        }}
      >
        <Icon name="doubleTone" size={13.3} tone="onImmersive" />
        Sounds
      </div>
    </At>
    <At top={75} right={16}>
      <CameraToolRail>
        {tikCameraTools.map((tool) => (
          <CameraToolRail.Item key={tool.label} icon={tool.icon} label={tool.label} />
        ))}
      </CameraToolRail>
    </At>
    <At bottom={102} left={66}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 68 }}>
        <div style={{ textAlign: 'center' }}>
          <Icon name="effectsIllustration" size={33.5} />
          <div
            style={{
              marginTop: 5,
              fontFamily: 'var(--tik-font-sans)',
              fontSize: 'var(--tik-font-micro-bold-size)',
              fontWeight: 700,
              color: 'var(--tik-color-text-on-immersive)',
              textShadow: 'var(--tik-elevation-action-button)',
            }}
          >
            Effects
          </div>
        </div>
        <RecordButton />
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              border: '2px solid var(--tik-color-text-on-immersive)',
              borderRadius: 'var(--tik-radius-l)',
              boxShadow: 'var(--tik-elevation-upload-frame)',
            }}
          >
            <Icon name="uploadIllustration" size={28} />
          </span>
          <div
            style={{
              marginTop: 5,
              fontFamily: 'var(--tik-font-sans)',
              fontSize: 'var(--tik-font-micro-bold-size)',
              fontWeight: 700,
              color: 'var(--tik-color-text-on-immersive)',
              textShadow: 'var(--tik-elevation-action-button)',
            }}
          >
            Upload
          </div>
        </div>
      </div>
    </At>
    <At bottom={45} left={0}>
      <div style={{ display: 'flex', justifyContent: 'center', width: 414 }}>
        <CameraModeStrip modes={tikCameraModes} active="15s" />
      </div>
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="immersive" />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok QR Code Scanner — node 4:744 */
const QrScanner: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="immersive" scale={scale} label="TikTok QR Code Scanner · 4:744">
    <VideoLayer src={tikCameraPreview} />
    <At top={323} left={82}>
      <Scanner hint="Align QR code in frame to scan" />
    </At>
    <At top={0} left={0}>
      <div style={{ width: 414 }}>
        <StatusBar surface="immersive" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: 44,
            padding: '0 18px',
            fontFamily: 'var(--tik-font-system)',
            color: 'var(--tik-color-text-on-immersive)',
          }}
        >
          <Icon name="arrowBack" size={18} tone="onImmersive" />
          <span
            style={{
              fontSize: 'var(--tik-font-system-title-size)',
              fontWeight: 600,
              letterSpacing: 'var(--tik-font-system-title-tracking)',
            }}
          >
            Scan
          </span>
          <span
            style={{
              justifySelf: 'end',
              fontSize: 'var(--tik-font-system-link-size)',
            }}
          >
            Photos
          </span>
        </div>
      </div>
    </At>
    <At bottom={38} left={0}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 7,
          width: 414,
        }}
      >
        <Icon name="tikCode" size={27.6} tone="onImmersive" />
        <span
          style={{
            fontFamily: 'var(--tik-font-sans)',
            fontSize: 'var(--tik-font-counter-size)',
            fontWeight: 700,
            color: 'var(--tik-color-text-on-immersive)',
          }}
        >
          My TikCode
        </span>
      </div>
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="immersive" />
      </div>
    </At>
  </PhoneFrame>
);

/** TikTok Upload photos — node 4:619 */
const UploadPhotos: React.FC<{ scale?: number }> = ({ scale }) => (
  <PhoneFrame surface="immersive" scale={scale} label="TikTok Upload photos · 4:619">
    <At top={0} left={0}>
      <div style={{ width: 414 }}>
        <StatusBar surface="immersive" />
      </div>
    </At>
    <At top={62} left={20}>
      <Icon name="close" size={16} tone="onImmersive" />
    </At>
    <At top={104} left={16}>
      <div style={{ fontFamily: 'var(--tik-font-sans)' }}>
        <div
          style={{
            fontSize: 'var(--tik-font-display-size)',
            fontWeight: 700,
            color: 'var(--tik-color-text-on-immersive)',
          }}
        >
          My 2020
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: 'var(--tik-font-system)',
            fontSize: 'var(--tik-font-system-body-size)',
            letterSpacing: 'var(--tik-font-system-body-tracking)',
            color: 'var(--tik-color-text-on-immersive)',
            opacity: 0.9,
          }}
        >
          Upload up to 8 photos
        </div>
      </div>
    </At>
    <At top={215} left={-40}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <PhotoCard src={tikPhotos[1]} alt="" width={235} height={396} />
        <PhotoCard src={tikPhotos[0]} alt="" width={248} height={440} counter="3/22" />
        <PhotoCard src={tikPhotos[2]} alt="" width={235} height={394} />
      </div>
    </At>
    <At bottom={92} left={72}>
      <Button variant="primary">Select photos</Button>
    </At>
    <At bottom={45} left={0}>
      <div style={{ display: 'flex', justifyContent: 'center', width: 414 }}>
        <CameraModeStrip modes={tikCameraModes} active="15s" />
      </div>
    </At>
    <At bottom={0} left={0}>
      <div style={{ width: 414 }}>
        <HomeIndicator surface="immersive" />
      </div>
    </At>
  </PhoneFrame>
);

const SCREENS: { name: string; node: string; Component: React.FC<{ scale?: number }> }[] = [
  { name: 'Home (For You)', node: '4:1061', Component: HomeForYou },
  { name: 'Home (Following)', node: '4:1144', Component: HomeFollowing },
  { name: 'Comments', node: '4:957', Component: Comments },
  { name: 'Share to', node: '4:844', Component: ShareTo },
  { name: 'User', node: '4:426', Component: User },
  { name: 'Privacy and settings', node: '4:251', Component: PrivacyAndSettings },
  { name: 'Edit Profile', node: '4:357', Component: EditProfile },
  { name: 'Find Friends', node: '4:195', Component: FindFriends },
  { name: 'All activity', node: '4:565', Component: AllActivity },
  { name: 'Direct Message', node: '4:530', Component: DirectMessage },
  { name: 'Album', node: '4:787', Component: Album },
  { name: 'Camera', node: '4:662', Component: Camera },
  { name: 'QR Code Scanner', node: '4:744', Component: QrScanner },
  { name: 'Upload photos', node: '4:619', Component: UploadPhotos },
];

const TelasDocumentationPage = () => (
  <UnooriaDocShell maxWidth="1600px">
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Telas • Composição"
      title="Telas Compostas"
      description="Catorze das quinze telas do arquivo Figma reconstruídas exclusivamente com os componentes de produção de src/tiktooria/. Nenhum mockup paralelo: cada tela é composição dos mesmos componentes que o pacote publica, com as coordenadas do arquivo aplicadas por posicionamento absoluto dentro da PhoneFrame."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Para que serve esta seção."
      barColor="#EA4359"
    />
    <TikDocGrid>
      <TikDocCard icon="🧩" title="Prova de composição">
        Se uma tela do arquivo não pode ser montada com os componentes publicados, falta um
        componente ou uma prop. Esta seção é o teste dessa completude.
      </TikDocCard>
      <TikDocCard icon="📐" title="Coordenadas do arquivo">
        As telas usam posicionamento absoluto com os mesmos valores do Figma, o que permite comparar
        lado a lado com o arquivo aberto no Dev Mode.
      </TikDocCard>
      <TikDocCard icon="🖼️" title="Bitmaps por prop">
        Quadros de vídeo, retratos, miniaturas e capas vêm de <code>public/tiktooria/</code> e são
        informados por prop — nunca embutidos no pacote.
      </TikDocCard>
      <TikDocCard icon="🚧" title="Andaimes restritos">
        <code>VideoLayer</code>, <code>At</code> e <code>Body</code> existem só neste arquivo de
        estórias e não integram o pacote.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:171"
      frameName="Página TikTok — 15 telas de 414×896"
      specs={[
        { label: 'Telas no arquivo', value: '15' },
        { label: 'Telas reconstruídas', value: '14' },
        { label: 'Componentes usados', value: '35' },
        { label: 'Dispositivo', value: '414 × 896' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Tela “Cover” não reconstruída',
          detail:
            'o frame 7:257 mede 1200×660 e é a capa do arquivo comunitário, não uma tela do produto. Foi deixado de fora deliberadamente.',
        },
        {
          subject: 'Posicionamento absoluto',
          detail:
            'as telas reproduzem as coordenadas do arquivo com posicionamento absoluto. Um produto real usaria fluxo normal; aqui o objetivo é a comparação pixel a pixel com o Figma.',
        },
        {
          subject: 'Elementos sem componente próprio',
          detail:
            'o rótulo “Cancel” da folha de compartilhamento, o atalho “Sounds” da câmera, os rótulos “Effects”/“Upload” e o cabeçalho de sistema do leitor de QR aparecem uma única vez no arquivo e não justificam componente próprio. São montados localmente com tokens da marca.',
        },
        {
          subject: 'Rolagem das telas longas',
          detail:
            'em “Privacy and settings”, “Edit Profile” e “Album” o conteúdo excede os 896px do frame, exatamente como no arquivo, que também extrapola a moldura. O recorte da PhoneFrame preserva esse comportamento.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia das telas"
      description="Cada tela abre com a barra de status, termina com a barra de abas ou o indicador de home, e organiza o conteúdo entre as duas."
      barColor="#65D2E9"
    />
    <div
      style={{
        border: '1px solid #E4E8E9',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 32,
      }}
    >
      {SCREENS.map((screen, index) => (
        <div
          key={screen.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '32px 1fr 120px',
            gap: 14,
            alignItems: 'center',
            padding: '10px 16px',
            fontSize: 13,
            borderTop: index === 0 ? 'none' : '1px solid #E4E8E9',
            background: index % 2 === 0 ? '#FFFFFF' : '#F5F5F5',
          }}
        >
          <span style={{ fontWeight: 700, color: '#22272A' }}>{index + 1}</span>
          <span style={{ color: '#22272A' }}>TikTok {screen.name}</span>
          <code style={{ fontSize: 11.5, color: '#6487C2' }}>node {screen.node}</code>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Matriz das catorze telas"
      description="Todas em escala reduzida, na ordem do arquivo."
      barColor="#161722"
    />
    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 32 }}>
      {SCREENS.map(({ name, Component }) => (
        <Component key={name} scale={0.42} />
      ))}
    </div>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Monte telas novas a partir dos componentes publicados, sem criar réplicas paralelas.',
        'Reserve os 44px da barra de status e os 83px da barra de abas (ou 35px do indicador).',
        'Passe todos os bitmaps por prop, a partir de public/tiktooria/.',
        'Escolha o contexto de superfície da tela inteira e propague-o aos componentes que o aceitam.',
      ]}
      donts={[
        'Não misture cromo claro e imersivo na mesma tela, exceto onde o arquivo o faz (folha branca sobre vídeo).',
        'Não recrie um componente localmente porque falta uma prop — acrescente a prop ao componente.',
        'Não use os andaimes VideoLayer, At e Body fora das estórias.',
        'Não embuta imagens no pacote.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="Sete telas são de cromo claro e sete são imersivas. As duas famílias convivem no mesmo produto, e a folha branca sobre vídeo é o único ponto em que se sobrepõem."
      barColor="#65D2E9"
    />
    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 32 }}>
      <HomeForYou scale={0.42} />
      <Comments scale={0.42} />
      <User scale={0.42} />
      <PrivacyAndSettings scale={0.42} />
    </div>

    <UnooriaDocSectionHeader
      title="7. Referência dos componentes usados"
      description="As catorze telas consomem os 35 componentes do módulo; nenhuma peça foi desenhada fora de src/tiktooria/."
      barColor="#161722"
    />
    <TikDocCard icon="📦" title="Importação">
      <pre style={{ margin: 0, fontSize: 12.5, whiteSpace: 'pre-wrap' }}>{`import '@unooria/design-system/tiktooria.css';
import {
  ActionRail, Avatar, Button, CameraModeStrip, CameraToolRail, Chip,
  CommentComposer, CommentItem, EmptyState, FeedHeader, HomeIndicator,
  Icon, ListRow, MediaGrid, MusicDisc, NavBar, PhoneFrame, PhotoCard,
  ProfileHeader, ProfileTabs, RecordButton, Scanner, SearchField,
  SectionLabel, Separator, SettingsRow, ShareAction, Sheet, SocialLogo,
  SoundHeader, StatTile, StatusBar, TabBar, Tooltip, VideoMeta,
} from '@unooria/design-system/tiktooria';`}</pre>
    </TikDocCard>
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa das telas compostas, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * As catorze telas em tamanho real, na ordem do arquivo.
 */
export const TodasAsTelas: Story = {
  name: '🖼️ Todas as telas',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      {SCREENS.map(({ name, Component }) => (
        <Component key={name} />
      ))}
    </div>
  ),
};

/**
 * O feed imersivo nas abas “For You” e “Following”.
 */
export const Feed: Story = {
  name: '🎬 Feed',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      <HomeForYou />
      <HomeFollowing />
    </div>
  ),
};

/**
 * As duas folhas inferiores sobre o vídeo.
 */
export const Folhas: Story = {
  name: '📄 Folhas',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      <Comments />
      <ShareTo />
    </div>
  ),
};

/**
 * Perfil, abas e grade de mídia.
 */
export const Perfil: Story = {
  name: '👤 Perfil',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      <User />
      <EditProfile />
    </div>
  ),
};

/**
 * As telas de cromo claro com listas.
 */
export const Listas: Story = {
  name: '📋 Listas',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      <PrivacyAndSettings />
      <FindFriends />
      <AllActivity />
      <DirectMessage />
    </div>
  ),
};

/**
 * Captura, leitura de código e seleção de fotos.
 */
export const Captura: Story = {
  name: '📷 Captura',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      <Camera />
      <QrScanner />
      <UploadPhotos />
    </div>
  ),
};

/**
 * A página de som, com cabeçalho, grade e botão flutuante.
 */
export const Som: Story = {
  name: '🎵 Som',
  render: () => (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: 24 }}>
      <Album />
    </div>
  ),
};
