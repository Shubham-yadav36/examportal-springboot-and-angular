package com.exam.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.exam.services.imple.UserDetailsServiceImpl;

import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsServiceImpl userDetailService;

	@Autowired
	private JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		final String requestokenHeader = request.getHeader("Authorization");
		String username = null;
		String jwtToken = null;

		if (requestokenHeader != null && requestokenHeader.startsWith("Bearer ")) {
			try {
				jwtToken = requestokenHeader.substring(7);
				username = this.jwtUtils.extractUsername(jwtToken);
			} catch (MalformedJwtException e) {
				System.out.println("Other Exeption !!");
			}
		}
//		validate Token
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			final UserDetails userDetails = this.userDetailService.loadUserByUsername(username);
			if (this.jwtUtils.validateToken(jwtToken, userDetails)) {
				// token is valid
				UsernamePasswordAuthenticationToken authenticationFilter = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());

				authenticationFilter.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authenticationFilter);
			}
		} else {

		}
		filterChain.doFilter(request, response);
	}

}