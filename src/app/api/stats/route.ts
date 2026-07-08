
export const dynamic = 'force-dynamic';
export const revalidate = 0;
interface GithubRepoResponseItem {
  fork: boolean;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

interface LeetcodeAcSubmission {
  difficulty: string;
  count: number;
  submissions: number;
}

interface LeetcodeTotalSubmission {
  difficulty: string;
  count: number;
  submissions: number;
}

// Dynamic route segment fallback configuration
export async function GET() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  };

  // If a GITHUB_TOKEN environment variable is present, use it to bypass public rate limits
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  let githubProfile = null;
  let githubRepos: unknown[] = [];
  let leetcode = null;

  // 1. Fetch GitHub Profile
  try {
    const ghProfileRes = await fetch('https://api.github.com/users/Dinesh2k06', {
      headers: headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    if (ghProfileRes.ok) {
      const ghProfileData = await ghProfileRes.json();
      githubProfile = {
        username: ghProfileData.login,
        avatarUrl: ghProfileData.avatar_url,
        name: ghProfileData.name || 'Dinesh S',
        bio: ghProfileData.bio || 'AI Engineer',
        publicRepos: ghProfileData.public_repos,
        followers: ghProfileData.followers,
        following: ghProfileData.following,
        reposUrl: ghProfileData.repos_url,
      };
    } else {
      console.warn(`GitHub profile API returned status ${ghProfileRes.status}`);
    }
  } catch (err) {
    console.error('Failed to fetch live GitHub Profile:', err);
  }

  // 2. Fetch GitHub Repositories
  try {
    const ghReposRes = await fetch('https://api.github.com/users/Dinesh2k06/repos?sort=updated&per_page=15', {
      headers: headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    if (ghReposRes.ok) {
      const ghReposData = await ghReposRes.json();
      githubRepos = (ghReposData as GithubRepoResponseItem[])
        .filter((r) => !r.fork)
        .slice(0, 4)
        .map((r) => ({
          name: r.name,
          description: r.description || 'No description available.',
          language: r.language || 'Code',
          stars: r.stargazers_count,
          forks: r.forks_count,
          htmlUrl: r.html_url,
        }));
    } else {
      console.warn(`GitHub repos API returned status ${ghReposRes.status}`);
    }
  } catch (err) {
    console.error('Failed to fetch live GitHub Repos:', err);
  }

  // 3. Fetch LeetCode Stats from the official GraphQL Endpoint
  let leetcodeError: string | null = null;
  try {
    const leetcodeQuery = {
      query: `
        query userProblemsSolved($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            problemsSolvedBeatsStats {
              difficulty
              percentage
            }
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
              reputation
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
              totalSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username: 'Dinesh__2006' },
    };

    const lcRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      },
      body: JSON.stringify(leetcodeQuery),
      next: { revalidate: 300 }, // Cache LeetCode GraphQL fetch for 5 minutes
    });

    const rawText = await lcRes.text();
    console.log('Raw LeetCode GraphQL Response for Dinesh__2006 Status:', lcRes.status);
    console.log('Raw LeetCode GraphQL Response Payload:', rawText);

    if (!lcRes.ok) {
      throw new Error(`LeetCode GraphQL HTTP error: ${lcRes.status} - ${rawText}`);
    }

    let lcData;
    try {
      lcData = JSON.parse(rawText);
    } catch {
      throw new Error('Failed to parse LeetCode GraphQL response as JSON.');
    }

    if (lcData.errors) {
      throw new Error(`LeetCode GraphQL returned query errors: ${JSON.stringify(lcData.errors)}`);
    }

    const user = lcData?.data?.matchedUser;
    if (!user) {
      throw new Error(`LeetCode GraphQL did not return matchedUser data.`);
    }

    const solved = user.submitStats.acSubmissionNum as LeetcodeAcSubmission[];
    const totalSub = user.submitStats.totalSubmissionNum as LeetcodeTotalSubmission[];

    // Find difficulty counts
    const allSolved = solved.find((s) => s.difficulty === 'All')?.count || 0;
    const easySolved = solved.find((s) => s.difficulty === 'Easy')?.count || 0;
    const mediumSolved = solved.find((s) => s.difficulty === 'Medium')?.count || 0;
    const hardSolved = solved.find((s) => s.difficulty === 'Hard')?.count || 0;

    // Calculate acceptance rate
    const totalAcceptedSub = solved.find((s) => s.difficulty === 'All')?.submissions || 1;
    const totalSubmitted = totalSub.find((s) => s.difficulty === 'All')?.submissions || 1;
    const acceptanceRate = Number(((totalAcceptedSub / totalSubmitted) * 100).toFixed(1)) || 0;

    leetcode = {
      totalSolved: allSolved,
      easySolved: easySolved,
      mediumSolved: mediumSolved,
      hardSolved: hardSolved,
      totalQuestions: 3300,
      easyQuestions: 820,
      mediumQuestions: 1720,
      hardQuestions: 760,
      acceptanceRate: acceptanceRate,
      ranking: user.profile?.ranking || 0,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Failed to fetch live LeetCode stats via GraphQL, trying Heroku backup:', errorMsg);
    
    try {
      const lcRes = await fetch('https://leetcode-stats-api.herokuapp.com/Dinesh__2006/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        },
        next: { revalidate: 300 }, // Cache backup for 5 minutes
      });
      if (!lcRes.ok) {
        throw new Error(`Heroku LeetCode API HTTP error: ${lcRes.status}`);
      }
      const lcData = await lcRes.json();
      console.log('Raw LeetCode Heroku Response for Dinesh__2006:', JSON.stringify(lcData));

      if (lcData.status !== 'success') {
        throw new Error(`Heroku LeetCode API returned status: ${lcData.status} - ${lcData.message || ''}`);
      }

      leetcode = {
        totalSolved: lcData.totalSolved,
        easySolved: lcData.easySolved,
        mediumSolved: lcData.mediumSolved,
        hardSolved: lcData.hardSolved,
        totalQuestions: lcData.totalQuestions || 3300,
        easyQuestions: lcData.easyQuestions || 820,
        mediumQuestions: lcData.mediumQuestions || 1720,
        hardQuestions: lcData.hardQuestions || 760,
        acceptanceRate: lcData.acceptanceRate,
        ranking: lcData.ranking,
      };
    } catch (backupErr) {
      const backupErrorMsg = backupErr instanceof Error ? backupErr.message : String(backupErr);
      console.error('Failed to fetch LeetCode stats via Heroku backup:', backupErrorMsg);
      leetcodeError = `GraphQL Error: ${errorMsg} | Backup Error: ${backupErrorMsg}`;
    }
  }

  return Response.json({
    githubProfile,
    githubRepos,
    leetcode,
    leetcodeError,
  });
}
