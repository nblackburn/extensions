import { OAuth } from "@raycast/api";
import { OAuthService, withAccessToken } from "@raycast/utils";
import {
    OAUTH_AUTHORIZE_URL,
    OAUTH_CLIENT_ID,
    OAUTH_REFRESH_TOKEN_URL,
    OAUTH_TOKEN_URL,
} from "../constants";

const client = new OAuth.PKCEClient({
    redirectMethod: OAuth.RedirectMethod.Web,
    providerName: "YNAB",
    providerIcon: "oauth-icon.png",
    description: "Connect your YNAB account",
});

export const ynab = new OAuthService({
    client,
    clientId: OAUTH_CLIENT_ID,
    tokenUrl: OAUTH_TOKEN_URL,
    authorizeUrl: OAUTH_AUTHORIZE_URL,
    refreshTokenUrl: OAUTH_REFRESH_TOKEN_URL,
    scope: "read-only",
});

export const withYNABAuth = withAccessToken(ynab);
