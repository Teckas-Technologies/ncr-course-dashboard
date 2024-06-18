import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export default function SocialMedia() {
    return (
        <>
            <div className="social-media pt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Follow Us On:</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="social-media-icons">
                            <FacebookIcon />
                            <TwitterIcon />
                            <LinkedinIcon />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}